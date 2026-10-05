// ============================================================
// 3D-карта образовательных маршрутов РУСАЛЕН — движок.
//
// Модель из двух состояний:
//  1. ОБЗОР — все кластеры на своих 3D-позициях, сцена вращается.
//  2. ФОКУС КЛАСТЕРА — клик по модулю или кластеру выбирает кластер:
//     он выходит на первый план (чистая топологическая раскладка
//     с глубиной), клиническая база остаётся посередине, остальные
//     кластеры уходят назад и гаснут. Всё остаётся настоящим 3D:
//     вращение, наклон, масштаб работают в любом состоянии.
// ============================================================
import { C, nodes, edges, programs, programToBubble, bubbles, programKeyByMatrixId } from './curriculumData';
import { schemePrograms, schemeZones, schemeRelations, schemeRelationTypes } from './programSchemeData';

const CLINICAL = 'КЛИНИЧЕСКИЕ АСПЕКТЫ';

function nodeBy(id) { return nodes.find((n) => n.id === id); }
function bubbleByName(name) { return bubbles.find((b) => b.name === name); }

export function initCurriculumMap() {
  const $ = (id) => document.getElementById(id);
  const canvas = $('cmScene');
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  const wrap = $('cmStage');
  const tip = $('cmTooltip');
  const searchEl = $('cmSearch');
  const programSelect = $('cmProgramSelect');
  const nodeTitleEl = $('cmNodeTitle');
  const nodeMetaEl = $('cmNodeMeta');

  // ---------- состояние ----------
  let W = 1, H = 1, dpr = 1;
  let yaw = -0.78, pitch = -0.42, zoom = 0.72, panX = 0, panY = 20;
  let drag = false, lastX = 0, lastY = 0, shiftDrag = false;
  let dragDistance = 0, suppressClick = false;
  let hoverId = null, hoverBubbleName = null;
  let selectedId = null;       // модуль, показанный в панели справа
  let selectedCluster = null;   // кластер в фокусе (имя пузыря) или null
  let activeProgram = null;     // выбранный маршрут (подсветка + прогресс)
  let densityMode = 'readable', showLabels = true, showBubbles = true;
  let focusOnly = false, schemeMode = false;
  let schemeScale = 1; // масштаб 2D-сборки (колесо мыши)
  let schemeSelected = null, schemeHover = null; // выбранная программа в 2D-сборке


  const disposers = [];
  const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); disposers.push(() => el.removeEventListener(ev, fn, opt)); };

  // ---------- базовые запросы к модели ----------
  function anchorOf(n) {
    if (n.group === 'core' || n.group === 'med') return CLINICAL;
    for (const p of n.programs) { const b = programToBubble[p]; if (b) return b; }
    return null;
  }
  function clusterMembers(name) { return nodes.filter((n) => anchorOf(n) === name); }
  function routeIds() { return activeProgram ? new Set(programs[activeProgram] || []) : null; }
  function inSearch(n) {
    const q = searchEl.value.trim().toLowerCase();
    return !q || n.label.toLowerCase().includes(q);
  }
  function incoming(id) { return edges.filter((e) => e.b === id && e.type !== 'assoc').map((e) => nodeBy(e.a)).filter(Boolean); }
  function outgoing(id) { return edges.filter((e) => e.a === id).map((e) => nodeBy(e.b)).filter(Boolean); }

  // ---------- обзорная раскладка (плотность) ----------
  const densityPresets = {
    compact: { spread: 1.18, gap: 0.78, offset: { pt: -160, pfc: 160, stress: 280, sex: -280, add: 170, stand: -200 } },
    readable: { spread: 1.34, gap: 1.0, offset: { pt: -130, pfc: 130, stress: 200, sex: -200, add: 130, stand: -140 } },
    detailed: { spread: 1.48, gap: 1.22, offset: { pt: -90, pfc: 90, stress: 130, sex: -130, add: 90, stand: -90 } },
  };
  function preset() { return densityPresets[densityMode] || densityPresets.readable; }
  // Небольшое раздвижение кластеров: свой сдвиг по «своей» оси + общий множитель.
  function layoutPos(n) {
    const k = preset();
    const o = k.offset;
    let x = n.x, y = n.y, z = n.z;
    if (n.group === 'pt') x += o.pt;
    if (n.group === 'pfc') x += o.pfc;
    if (n.group === 'stress') z += o.stress;
    if (n.group === 'sex') z += o.sex;
    if (n.group === 'add') y -= o.add;
    if (n.group === 'stand') z += o.stand;
    return { x: x * k.spread, y: y * k.spread, z: z * k.spread };
  }
  function overviewCentroid(name) {
    const ms = clusterMembers(name);
    if (!ms.length) return { x: 0, y: 0, z: 0 };
    let x = 0, y = 0, z = 0;
    ms.forEach((n) => { const p = layoutPos(n); x += p.x; y += p.y; z += p.z; });
    return { x: x / ms.length, y: y / ms.length, z: z / ms.length };
  }

  // ---------- топологическая раскладка кластера (для фокуса) ----------
  // Уровни по зависимостям: столбцы по X, распределение по Y, глубина по Z.
  const layoutCache = new Map();
  function clusterLayout(name) {
    const key = name + '|' + densityMode;
    if (layoutCache.has(key)) return layoutCache.get(key);
    const members = clusterMembers(name);
    const ids = new Set(members.map((n) => n.id));
    const useful = edges.filter((e) => ids.has(e.a) && ids.has(e.b) && e.type !== 'assoc' && e.type !== 'equiv');

    const indeg = new Map(members.map((n) => [n.id, 0]));
    const out = new Map(members.map((n) => [n.id, []]));
    useful.forEach((e) => { indeg.set(e.b, (indeg.get(e.b) || 0) + 1); out.get(e.a).push(e.b); });
    const level = new Map(members.map((n) => [n.id, 0]));
    const work = new Map(indeg);
    let queue = members.filter((n) => work.get(n.id) === 0).sort((a, b) => a.y - b.y || a.x - b.x).map((n) => n.id);
    const seen = new Set();
    while (queue.length) {
      const id = queue.shift();
      if (seen.has(id)) continue;
      seen.add(id);
      for (const to of out.get(id)) {
        level.set(to, Math.max(level.get(to) || 0, (level.get(id) || 0) + 1));
        work.set(to, work.get(to) - 1);
        if (work.get(to) === 0) queue.push(to);
      }
    }
    // циклы и изоляты — по исходному горизонтальному положению
    const unresolved = members.filter((n) => !seen.has(n.id));
    if (unresolved.length) {
      const xs = unresolved.map((n) => n.x);
      const min = Math.min(...xs), span = Math.max(1, Math.max(...xs) - min);
      unresolved.forEach((n) => level.set(n.id, Math.round(((n.x - min) / span) * Math.max(2, Math.ceil(members.length / 4)))));
    }

    const groups = new Map();
    members.forEach((n) => { const l = level.get(n.id) || 0; if (!groups.has(l)) groups.set(l, []); groups.get(l).push(n); });
    const levels = [...groups.keys()].sort((a, b) => a - b);
    const maxL = Math.max(0, ...levels);
    const xGap = densityMode === 'compact' ? 165 : (densityMode === 'readable' ? 205 : 235);
    const yGap = densityMode === 'compact' ? 100 : (densityMode === 'readable' ? 124 : 140);

    const map = new Map();
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const l of levels) {
      const arr = groups.get(l).sort((a, b) => a.y - b.y || a.z - b.z || a.label.localeCompare(b.label, 'ru'));
      const x = (l - maxL / 2) * xGap;
      arr.forEach((n, i) => {
        const y = ((arr.length - 1) / 2 - i) * yGap;
        const z = l * 90; // каждый следующий уровень глубже — сцена остаётся объёмной
        map.set(n.id, { x, y, z });
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      });
    }
    if (!isFinite(minX)) { minX = maxX = minY = maxY = 0; }
    const res = { map, bounds: { width: maxX - minX, height: maxY - minY } };
    layoutCache.set(key, res);
    return res;
  }

  // ---------- задняя плоскость: прочие кластеры по кругу ----------
  let backCacheKey = null, backMap = null;
  function backCenters() {
    if (backCacheKey === selectedCluster) return backMap;
    const names = bubbles
      .filter((b) => b.name !== selectedCluster && !(b.name === CLINICAL && selectedCluster !== CLINICAL))
      .map((b) => b.name);
    const m = {};
    const n = Math.max(1, names.length);
    names.forEach((nm, i) => {
      const a = -Math.PI / 2 + (i * (Math.PI * 2)) / n;
      m[nm] = { x: Math.cos(a) * 640, y: Math.sin(a) * 340 };
    });
    backCacheKey = selectedCluster; backMap = m;
    return m;
  }

  // ---------- мировые координаты ----------
  function nodeWorld(n) {
    if (!selectedCluster) return layoutPos(n);
    const home = anchorOf(n);
    if (home === selectedCluster) {
      return clusterLayout(selectedCluster).map.get(n.id) || { x: 0, y: 0, z: 0 };
    }
    if (home === CLINICAL) {
      const l = clusterLayout(CLINICAL).map.get(n.id) || { x: 0, y: 0, z: 0 };
      return { x: l.x * .42, y: l.y * .42, z: 520 + l.z * .42 }; // средняя плоскость — тоже 3D
    }
    const c = (backCenters() || {})[home];
    if (!c) return layoutPos(n);
    const p = layoutPos(n), cen = overviewCentroid(home);
    return {
      x: c.x + (p.x - cen.x) * .16,
      y: c.y + (p.y - cen.y) * .16,
      z: 1150 + (p.z - cen.z) * .16,
    };
  }
  function bubbleWorld(b) {
    if (!selectedCluster) return { x: b.x, y: b.y, z: b.z, r: b.r };
    const fb = clusterLayout(selectedCluster).bounds;
    if (b.name === selectedCluster) {
      return { x: 0, y: 0, z: -60, rx: Math.max(320, fb.width / 2 + 150), ry: Math.max(230, fb.height / 2 + 130) };
    }
    if (b.name === CLINICAL && selectedCluster !== CLINICAL) {
      const cb = clusterLayout(CLINICAL).bounds;
      return { x: 0, y: 0, z: 470, rx: Math.max(210, cb.width / 2 * .42 + 100), ry: Math.max(160, cb.height / 2 * .42 + 90) };
    }
    const c = (backCenters() || {})[b.name] || { x: 0, y: 0 };
    return { x: c.x, y: c.y, z: 1100, rx: 120, ry: 85 };
  }

  // ---------- проекция ----------
  function resize() {
    const r = wrap.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }
  function proj(p) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const x1 = p.x * cy - p.z * sy, z1 = p.x * sy + p.z * cy;
    const y2 = p.y * cp - z1 * sp, z2 = p.y * sp + z1 * cp;
    const f = 1220;
    const s = (f / Math.max(300, f + z2 + 1100)) * zoom;
    return { x: W / 2 + panX + x1 * s, y: H / 2 + panY - y2 * s, z: z2, s };
  }
  function rgba(hex, a) {
    const n = parseInt(hex.replace('#', ''), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
  function lineStyle(type) {
    if (type === 'shared') return { c: '#67e8f9', dash: [], w: 2.2 };
    if (type === 'bridge') return { c: '#f9a8d4', dash: [7, 5], w: 2 };
    if (type === 'assoc') return { c: '#94a3b8', dash: [2, 6], w: 1.3 };
    return { c: '#e5e7eb', dash: [], w: 1.7 }; // req
  }

  // ---------- видимость и яркость ----------
  function nodeVisible(n) {
    if (focusOnly && selectedCluster) { const h = anchorOf(n); return h === selectedCluster || h === CLINICAL; }
    return true;
  }
  function nodeAlpha(n) {
    const r = routeIds();
    let a = 1;
    if (selectedCluster) {
      const home = anchorOf(n);
      if (home === selectedCluster) a = r ? (r.has(n.id) ? 1 : .5) : 1;
      else if (home === CLINICAL) a = .6;
      else a = .12;
    } else if (r) {
      a = r.has(n.id) ? 1 : .25;
    }
    if (searchEl.value.trim() && !inSearch(n)) a *= .05;
    return a;
  }
  function edgeAlpha(e) {
    const r = routeIds();
    if (selectedCluster) {
      const ha = anchorOf(nodeBy(e.a)), hb = anchorOf(nodeBy(e.b));
      const F = (h) => h === selectedCluster;
      const M = (h) => h === CLINICAL && selectedCluster !== CLINICAL;
      if (F(ha) && F(hb)) return r ? ((r.has(e.a) && r.has(e.b)) ? .95 : .3) : .9;
      if ((F(ha) && M(hb)) || (F(hb) && M(ha))) return .78;   // выбранный кластер ↔ клиническая база: ярко
      if ((F(ha) && !M(hb)) || (F(hb) && !M(ha))) return .28; // мосты выбранного кластера наружу
      if (M(ha) && M(hb)) return .4;
      if (M(ha) || M(hb)) return .05;
      return 0;                                                // задний план друг с другом — скрыт
    }
  
    if (r && !(r.has(e.a) && r.has(e.b))) return (e.type === 'req' || e.type === 'bridge' || e.type === 'shared') ? .2 : .04;
    return e.type === 'assoc' ? .25 : .8;
  }
  function shouldLabel(n, alpha) {
    if (n.id === selectedId || n.id === hoverId) return true;
    if (searchEl.value.trim() && inSearch(n)) return true;
    if (!showLabels) return false;
    if (selectedCluster) return anchorOf(n) === selectedCluster && alpha >= .5;
    return densityMode === 'detailed' && alpha >= .5;
  }

  // ---------- подписи без наложений ----------
  function wrapText(text, maxChars = 24, maxLines = 2) {
    const words = text.split(' '); const lines = []; let s = '';
    for (const w of words) { if ((s + ' ' + w).trim().length > maxChars) { if (s) lines.push(s); s = w; } else s = (s + ' ' + w).trim(); }
    if (s) lines.push(s);
    if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] += '…'; }
    return lines;
  }
  function labelOverlap(a, b) {
    return !(a.x + a.w + 4 < b.x || b.x + b.w + 4 < a.x || a.y + a.h + 4 < b.y || b.y + b.h + 4 < a.y);
  }
  function chooseLabelBox(px, py, r, w, h, placed) {
    const gap = 7;
    const candidates = [
      { x: px - w / 2, y: py + r + gap },
      { x: px - w / 2, y: py - r - h - gap },
      { x: px + r + gap, y: py - h / 2 },
      { x: px - r - w - gap, y: py - h / 2 },
      { x: px + r * .65, y: py + r * .65 },
      { x: px - r * .65 - w, y: py + r * .65 },
      { x: px + r * .65, y: py - r * .65 - h },
      { x: px - r * .65 - w, y: py - r * .65 - h },
    ];
    const inBounds = (b) => b.x > 4 && b.y > 4 && b.x + b.w < W - 4 && b.y + b.h < H - 4;
    for (const b of candidates) { if (inBounds(b) && !placed.some((p) => labelOverlap(b, p))) return { box: b, score: 0 }; }
    let best = candidates[0], bestScore = 1e18;
    for (const b of candidates) {
      let score = 0;
      placed.forEach((p) => {
        if (labelOverlap(b, p)) {
          const ox = Math.max(0, Math.min(b.x + b.w, p.x + p.w) - Math.max(b.x, p.x));
          const oy = Math.max(0, Math.min(b.y + b.h, p.y + p.h) - Math.max(b.y, p.y));
          score += ox * oy;
        }
      });
      if (!inBounds(b)) score += 100000;
      if (score < bestScore) { best = b; bestScore = score; }
    }
    return { box: best, score: bestScore };
  }

  // ---------- отрисовка ----------
  // ---------- 2D-сборка программ (матрица v11 · визуальные связи) ----------
  function renderScheme() {
    const BW = 174, BH = 74; // размеры карточки программы (как в HTML-примере)
    // Не даём сборке сжиматься до нечитаемости: минимальный масштаб,
    // остальное смотрится сдвигом (тянуть) и масштабом (колесо).
    const fitS = Math.min((W - 24) / 1195, (H - 40) / 660, 1.5);
    const s = Math.max(0.62, fitS) * schemeScale;
    const ox = (W - 1195 * s) / 2 + panX;
    let oy = (H - 660 * s) / 2 + panY;
    if (660 * s > H - 24) oy = 12 + panY; // высоко — прижимаем к верху, низ доступен сдвигом
    const X = (v) => ox + v * s, Y = (v) => oy + v * s;
    const fs = Math.max(8, 11 * s), fsS = Math.max(7, 9 * s);
    ctx.textBaseline = 'alphabetic';
    // зоны
    for (const z of schemeZones) {
      roundRect(X(z.x), Y(z.y), z.w * s, z.h * s, 22);
      ctx.fillStyle = 'rgba(79,140,210,.045)'; ctx.fill();
      ctx.strokeStyle = 'rgba(79,140,210,.32)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = 'rgba(140,170,210,.72)'; ctx.font = `700 ${Math.max(8, 10 * s)}px system-ui`; ctx.textAlign = 'left';
      // заголовок зоны не должен вылезать за её рамку и перекрывать соседние блоки
      const maxW = z.w * s - 28;
      let zTitle = z.title;
      if (ctx.measureText(zTitle).width > maxW) {
        const keep = Math.max(4, Math.floor((maxW / ctx.measureText(zTitle).width) * zTitle.length) - 1);
        zTitle = zTitle.slice(0, keep) + '…';
      }
      ctx.fillText(zTitle, X(z.x + 14), Y(z.y + 22));
    }
    // связи между программами
    const byId = {}; schemePrograms.forEach((p) => { byId[p.id] = p; });
    for (const r of schemeRelations) {
      const a = byId[r.from], b = byId[r.to];
      const meta = schemeRelationTypes[r.type];
      // карточки друг под другом (ступени I → II) — вертикальный коннектор
      const stacked = Math.abs(a.x - b.x) < 1 && b.y > a.y;
      const sx = stacked ? X(a.x + BW / 2) : X(a.x + BW);
      const sy = stacked ? Y(a.y + BH) : Y(a.y + BH / 2);
      const tx = stacked ? sx : X(b.x);
      const ty = stacked ? Y(b.y) : Y(b.y + BH / 2);
      const mx = (sx + tx) / 2;
      const hot = schemeSelected && (r.from === schemeSelected || r.to === schemeSelected);
      ctx.globalAlpha = schemeSelected ? (hot ? 1 : .13) : .8;
      ctx.strokeStyle = meta.color; ctx.lineWidth = hot ? 2.6 : 1.8;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.bezierCurveTo(mx, sy, mx, ty, tx, ty); ctx.stroke();
      const ang = Math.atan2(ty - sy, tx - sx), len = 7;
      ctx.fillStyle = meta.color; ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx - Math.cos(ang - .45) * len, ty - Math.sin(ang - .45) * len);
      ctx.lineTo(tx - Math.cos(ang + .45) * len, ty - Math.sin(ang + .45) * len);
      ctx.closePath(); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // карточки программ
    for (const p of schemePrograms) {
      const x = X(p.x), y = Y(p.y), w = BW * s, h = BH * s;
      const col = p.format === 'ПК' ? '#4fa8ff' : '#ff9b52';
      const sel = p.id === schemeSelected, hov = p.id === schemeHover;
      p._scheme = { x, y, w, h };
      roundRect(x, y, w, h, 10);
      ctx.fillStyle = p.format === 'ПК' ? 'rgba(79,168,255,.13)' : 'rgba(255,155,82,.11)'; ctx.fill();
      ctx.strokeStyle = sel ? '#fff' : col; ctx.lineWidth = sel ? 2.2 : (hov ? 1.8 : 1.2); ctx.stroke();
      if (sel) { roundRect(x, y, w, h, 10); ctx.strokeStyle = col; ctx.globalAlpha = .55; ctx.lineWidth = 4; ctx.stroke(); ctx.globalAlpha = 1; }
      // все внутренние отступы масштабируются вместе с карточкой, иначе текст
      // при уменьшении масштаба вылезает за рамку и перекрывает соседнюю карточку
      const pad = 9 * s, topBase = 6 * s + fsS;
      ctx.font = `800 ${fsS}px system-ui`; ctx.textAlign = 'left';
      ctx.fillStyle = col; ctx.fillText(p.format, x + pad, y + topBase);
      ctx.font = `600 ${Math.max(6.5, 8 * s)}px system-ui`; ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(230,240,255,.55)'; ctx.fillText(p.hours.total > 0 ? `${p.hours.total} ч` : '— ч', x + w - pad, y + topBase);
      const base0 = topBase + 3 * s + fs; // первая строка названия
      const lh = fs + 3 * s;              // межстрочный интервал
      const maxLines = Math.max(1, Math.min(3, Math.floor((h - 5 * s - base0) / lh) + 1));
      const lines = wrapText(p.short || p.name, Math.max(8, Math.floor((w - 2 * pad) / (fs * .52))), maxLines);
      ctx.font = `700 ${fs}px system-ui`; ctx.textAlign = 'left'; ctx.fillStyle = '#eaf2ff';
      lines.forEach((t, i) => ctx.fillText(t, x + pad, y + base0 + i * lh));
    }
    // легенда типов связей — верхний правый угол
    ctx.font = `600 ${Math.max(8, 9.5 * s)}px system-ui`; ctx.textAlign = 'left';
    let lx = W - 16, ly = 18;
    Object.values(schemeRelationTypes).reverse().forEach((m) => {
      const tw = ctx.measureText(m.label).width + 30;
      ctx.strokeStyle = m.color; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(lx - tw + 4, ly - 4); ctx.lineTo(lx - tw + 24, ly - 4); ctx.stroke();
      ctx.fillStyle = 'rgba(213,226,244,.8)'; ctx.fillText(m.label, lx - tw + 30, ly);
      lx -= tw + 16;
    });
    ctx.globalAlpha = 1;
  }

  function render() {
    ctx.clearRect(0, 0, W, H); ctx.save();
    if (schemeMode) { renderScheme(); ctx.restore(); return; }

    // сетка-ориентир на «полу»
    ctx.globalAlpha = selectedCluster ? .02 : .1;
    ctx.strokeStyle = '#7aa2d6'; ctx.lineWidth = 1;
    for (let i = -800; i <= 800; i += 200) {
      let a = proj({ x: i, y: -720, z: -800 }), b = proj({ x: i, y: -720, z: 800 });
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      a = proj({ x: -800, y: -720, z: i }); b = proj({ x: 800, y: -720, z: i });
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // пузыри-кластеры; в фокусе контур строится точно вокруг своих модулей
    if (showBubbles) {
      const planePts = (name) => nodes.filter((n) => nodeVisible(n) && anchorOf(n) === name).map((n) => proj(nodeWorld(n)));
      const fit = (pts, padX, padY) => {
        if (!pts.length) return null;
        const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
        const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
        return { x: (minX + maxX) / 2, y: (minY + maxY) / 2, rx: (maxX - minX) / 2 + padX, ry: (maxY - minY) / 2 + padY };
      };
      for (const b of [...bubbles].sort((u, v) => bubbleWorld(v).z - bubbleWorld(u).z)) {
        ctx.save();
        if (!selectedCluster) {
          const bw = bubbleWorld(b); const c = proj(bw);
          const ex = proj({ x: bw.x + bw.r, y: bw.y, z: bw.z });
          const rx = Math.max(26, Math.abs(ex.x - c.x)); const ry = rx;
          b._screen = { x: c.x, y: c.y, rx, ry, z: c.z };
          drawOverviewBubble(b, c, rx, ry);
        } else if (b.name === selectedCluster || b.name === CLINICAL) {
          const f = fit(planePts(b.name), 80, 58);
          if (f) {
            b._screen = { x: f.x, y: f.y, rx: f.rx, ry: f.ry, z: 0 };
            if (b.name === selectedCluster) drawFrontBubble(b, f, f.rx, f.ry);
            else drawPlaneBubble(b, f, f.rx, f.ry, .55);
          }
        } else {
          const bw = bubbleWorld(b); const c = proj(bw);
          const ex = proj({ x: bw.x + bw.rx, y: bw.y, z: bw.z });
          const ey = proj({ x: bw.x, y: bw.y + bw.ry, z: bw.z });
          b._screen = { x: c.x, y: c.y, rx: Math.max(28, Math.abs(ex.x - c.x)), ry: Math.max(22, Math.abs(ey.y - c.y)), z: c.z };
          drawPlaneBubble(b, c, b._screen.rx, b._screen.ry, .16);
        }
        ctx.restore();
      }
    }

    // связи (дальние раньше)
    const edgeDraw = [];
    for (const e of edges) {
      const a = nodeBy(e.a), b = nodeBy(e.b);
      if (!nodeVisible(a) || !nodeVisible(b)) continue;
      const alpha = edgeAlpha(e);
      if (alpha <= .01) continue;
      const pa = proj(nodeWorld(a)), pb = proj(nodeWorld(b));
      edgeDraw.push({ e, pa, pb, alpha, z: (pa.z + pb.z) / 2 });
    }
    edgeDraw.sort((u, v) => u.z - v.z);
    for (const d of edgeDraw) {
      const st = lineStyle(d.e.type);
      const ha = anchorOf(nodeBy(d.e.a)), hb = anchorOf(nodeBy(d.e.b));
      const cross = selectedCluster && ((ha === selectedCluster && hb === CLINICAL) || (hb === selectedCluster && ha === CLINICAL));
      ctx.globalAlpha = d.alpha;
      ctx.strokeStyle = st.c; ctx.lineWidth = cross ? st.w * 1.8 : st.w;
      ctx.setLineDash(st.dash);
      ctx.beginPath(); ctx.moveTo(d.pa.x, d.pa.y); ctx.lineTo(d.pb.x, d.pb.y); ctx.stroke();
      ctx.setLineDash([]);
      if (d.e.type === 'req' || d.e.type === 'bridge') {
        const ang = Math.atan2(d.pb.y - d.pa.y, d.pb.x - d.pa.x), len = 7;
        ctx.fillStyle = st.c; ctx.beginPath();
        ctx.moveTo(d.pb.x, d.pb.y);
        ctx.lineTo(d.pb.x - Math.cos(ang - .45) * len, d.pb.y - Math.sin(ang - .45) * len);
        ctx.lineTo(d.pb.x - Math.cos(ang + .45) * len, d.pb.y - Math.sin(ang + .45) * len);
        ctx.closePath(); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // модули (дальние раньше)
    const drawnNodes = nodes.filter(nodeVisible)
      .map((n) => {
        const p = proj(nodeWorld(n));
        let r = Math.max(4.5, 8.5 * p.s + 4.5);
        if (n.type === 'bridge' || n.type === 'addon') r *= .82;
        if (n.type === 'environment') r *= 1.35;
        return { n, p, r };
      })
      .sort((a, b) => a.p.z - b.p.z);
    for (const { n, p, r } of drawnNodes) {
      const alpha = nodeAlpha(n);
      const col = C[n.group];
      const selected = n.id === selectedId, hovered = n.id === hoverId;
      ctx.globalAlpha = alpha;
      if (n.exam) { ctx.beginPath(); ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2; ctx.stroke(); }
      if (n.shared) { ctx.beginPath(); ctx.arc(p.x, p.y, r + 2.5, 0, Math.PI * 2); ctx.strokeStyle = '#67e8f9'; ctx.lineWidth = 1.5; ctx.stroke(); }
      ctx.beginPath(); ctx.arc(p.x, p.y, r + (selected ? 4 : 0), 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
      ctx.strokeStyle = selected ? '#fff' : rgba('#ffffff', hovered ? .8 : .3);
      ctx.lineWidth = selected ? 3 : 1.2; ctx.stroke();
      n._screen = { x: p.x, y: p.y, r: r + 8, z: p.z };
    }
    // подписи — отдельным проходом поверх всех узлов, с избеганием наложений
    const placed = drawnNodes.map(({ p, r }) => ({ x: p.x - r - 6, y: p.y - r - 6, w: (r + 6) * 2, h: (r + 6) * 2 }));
    for (const { n, p, r } of drawnNodes) {
      const alpha = nodeAlpha(n);
      if (!shouldLabel(n, alpha)) continue;
      const lines = wrapText(n.label, n.label.length > 30 ? 20 : 24, 2);
      const fs = Math.max(8, 9.5 * p.s + 3);
      ctx.font = `600 ${fs}px system-ui`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      const lw = Math.min(180, Math.max(...lines.map((t) => ctx.measureText(t).width)) + 14);
      const lh = lines.length * (fs + 2) + 8;
      const { box, score } = chooseLabelBox(p.x, p.y, r, lw, lh, placed);
      if (score > 1500) continue; // слишком тесно — подпись пропускаем
      placed.push({ x: box.x, y: box.y, w: lw, h: lh });
      roundRect(box.x, box.y, lw, lh, 8);
      ctx.fillStyle = 'rgba(5,13,25,.93)'; ctx.fill();
      ctx.strokeStyle = rgba(C[n.group], .42); ctx.lineWidth = .8; ctx.stroke();
      ctx.fillStyle = '#f2f7ff';
      const cx = box.x + lw / 2;
      lines.forEach((t, i) => ctx.fillText(t, cx, box.y + 4 + i * (fs + 2)));
    }
    ctx.globalAlpha = 1;

    // оси видны только в обзоре
    if (!selectedCluster) {
      const o = proj({ x: -720, y: -650, z: -720 });
      const ax = proj({ x: -520, y: -650, z: -720 }), ay = proj({ x: -720, y: -450, z: -720 }), az = proj({ x: -720, y: -650, z: -520 });
      [['X · способы работы', ax, '#c084fc'], ['Y · фундамент → интеграция', ay, '#60a5fa'], ['Z · предметные области', az, '#fbbf24']].forEach(([t, p, c]) => {
        ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        ctx.fillStyle = c; ctx.font = '600 10px system-ui'; ctx.textAlign = 'left'; ctx.fillText(t, p.x + 4, p.y - 2);
      });
    }
    ctx.restore();
  }

  function drawOverviewBubble(b, c, rx, ry) {
    const hovered = hoverBubbleName === b.name;
    const grad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, Math.max(rx, ry));
    grad.addColorStop(0, rgba(b.color, hovered ? .09 : .055));
    grad.addColorStop(1, rgba(b.color, hovered ? .02 : .012));
    ctx.beginPath(); ctx.ellipse(c.x, c.y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = rgba(b.color, hovered ? .85 : .4); ctx.lineWidth = hovered ? 2.2 : 1.5;
    ctx.setLineDash([7, 7]); ctx.stroke(); ctx.setLineDash([]);
    const count = clusterMembers(b.name).length;
    const label = `${b.name} · ${count}`;
    ctx.font = '700 11px system-ui';
    const tw = ctx.measureText(label).width + 20, th = 22;
    roundRect(c.x - tw / 2, c.y - ry - 16, tw, th, 11);
    ctx.fillStyle = 'rgba(5,13,25,.92)'; ctx.fill();
    ctx.strokeStyle = rgba(b.color, hovered ? .8 : .5); ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = rgba(b.color, .95); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, c.x, c.y - ry - 5);
  }
  function drawFrontBubble(b, c, rx, ry) {
    ctx.shadowColor = rgba(b.color, .28); ctx.shadowBlur = 32;
    const grad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, Math.max(rx, ry));
    grad.addColorStop(0, rgba(b.color, .06)); grad.addColorStop(1, rgba(b.color, .012));
    ctx.beginPath(); ctx.ellipse(c.x, c.y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = rgba(b.color, .9); ctx.lineWidth = 2.4; ctx.stroke();
    ctx.font = '800 14px system-ui';
    const tw = ctx.measureText(b.name).width + 28, th = 30;
    roundRect(c.x - tw / 2, c.y - ry - 18, tw, th, 15);
    ctx.fillStyle = 'rgba(5,13,25,.94)'; ctx.fill();
    ctx.strokeStyle = rgba(b.color, .7); ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = b.color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(b.name, c.x, c.y - ry - 3);
  }
  function drawPlaneBubble(b, c, rx, ry, alpha) {
    ctx.globalAlpha = alpha;
    ctx.beginPath(); ctx.ellipse(c.x, c.y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = rgba(b.color, .01); ctx.fill();
    ctx.strokeStyle = rgba(b.color, .35); ctx.lineWidth = 1;
    ctx.setLineDash([6, 7]); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = '700 10px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = rgba(b.color, .5);
    ctx.fillText(b.name, c.x, c.y - ry - 6);
    ctx.globalAlpha = 1;
  }

  // ---------- пикинг ----------
  function pickScheme(mx, my) {
    for (const p of schemePrograms) {
      const b = p._scheme;
      if (b && mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) return p;
    }
    return null;
  }
  function pickNode(mx, my) {
    let best = null, bd = 1e9, bz = -1e9;
    for (const n of nodes) {
      if (!n._screen || !nodeVisible(n)) continue;
      const d = Math.hypot(mx - n._screen.x, my - n._screen.y);
      if (d < n._screen.r + 8 && (d < bd - 1 || (Math.abs(d - bd) < 2 && n._screen.z > bz))) { best = n; bd = d; bz = n._screen.z; }
    }
    return best;
  }
  function pickBubble(mx, my) {
    let best = null, score = 1e9;
    for (const b of bubbles) {
      if (!b._screen) continue;
      const nx = (mx - b._screen.x) / b._screen.rx, ny = (my - b._screen.y) / b._screen.ry;
      const d = nx * nx + ny * ny;
      if (d < 1 && d < score) { best = b; score = d; }
    }
    return best;
  }

  // ---------- авто-масштаб при входе в фокус ----------
  function fitFocus() {
    panX = 0; panY = 20;
    if (!selectedCluster) { zoom = 0.72; return; }
    const b = clusterLayout(selectedCluster).bounds;
    const s0 = 0.46; // примерный мировой→экранный масштаб передней плоскости
    zoom = Math.max(.45, Math.min(1.7, 0.92 * Math.min(W / ((b.width || 600) + 360), H / ((b.height || 420) + 320)) / s0));
  }

  // ---------- события мыши ----------
  on(canvas, 'pointerdown', (e) => {
    drag = true; dragDistance = 0;
    canvas.classList.add('dragging');
    lastX = e.clientX; lastY = e.clientY; shiftDrag = e.shiftKey;
    canvas.setPointerCapture(e.pointerId);
  });
  on(canvas, 'pointermove', (e) => {
    if (drag) {
      canvas.style.cursor = 'grabbing';
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      if (schemeMode || shiftDrag || e.shiftKey) { panX += dx; panY += dy; }
      else {
        yaw += dx * .008; pitch += dy * .008;
        pitch = Math.max(-1.45, Math.min(1.45, pitch));
      }
      lastX = e.clientX; lastY = e.clientY; render(); return;
    }
    const r = canvas.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
    const sp = schemeMode ? pickScheme(mx, my) : null;
    const n = schemeMode ? null : pickNode(mx, my);
    const b = !n && !schemeMode ? pickBubble(mx, my) : null;
    hoverId = n?.id || null;
    schemeHover = sp?.id || null;
    hoverBubbleName = b && !selectedCluster ? b.name : null;
    canvas.style.cursor = (n || b || sp) ? 'pointer' : 'grab';
    if (n) { tip.style.display = 'block'; tip.textContent = n.label; }
    else if (sp) { tip.style.display = 'block'; tip.textContent = `${sp.name} · ${sp.format} · ${sp.hours.total} ч`; }
    else if (b) { tip.style.display = 'block'; tip.textContent = 'Кластер: ' + b.name; }
    else tip.style.display = 'none';
    tip.style.left = (e.clientX + 13) + 'px'; tip.style.top = (e.clientY + 13) + 'px';
    render();
  });
  on(canvas, 'pointerup', () => {
    drag = false; canvas.classList.remove('dragging'); canvas.style.cursor = 'grab';
    if (dragDistance > 6) { suppressClick = true; setTimeout(() => { suppressClick = false; }, 0); }
  });
  on(canvas, 'click', (e) => {
    if (suppressClick) return;
    const r = canvas.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
    if (schemeMode) {
      const sp = pickScheme(mx, my);
      schemeSelected = sp && schemeSelected !== sp.id ? sp.id : null;
      if (schemeSelected) showProgramDetails(schemePrograms.find((p) => p.id === schemeSelected));
      render(); return;
    }
    const n = pickNode(mx, my);
    if (n) {
      selectedId = n.id;
      // выбор модуля = выбор его кластера
      const cluster = anchorOf(n);
      if (cluster && cluster !== selectedCluster) { selectedCluster = cluster; fitFocus(); }
      showDetails(n); render(); return;
    }
    const b = pickBubble(mx, my);
    if (b) {
      if (selectedCluster === b.name) {
        selectedCluster = null; selectedId = null; activeProgram = null;
        programSelect.value = 'Все программы';
        zoom = 0.72;
      } else {
        selectedCluster = b.name; selectedId = null;
        if (b.programs.length === 1) { activeProgram = b.programs[0]; programSelect.value = activeProgram; }
        fitFocus();
        showBubbleDetails(b);
      }
      render(); return;
    }
    // пустое место — сброс
    selectedCluster = null; selectedId = null; activeProgram = null;
    programSelect.value = 'Все программы';
    zoom = 0.72;
    render();
  });
  on(canvas, 'wheel', (e) => {
    e.preventDefault();
    if (schemeMode) {
      schemeScale *= e.deltaY > 0 ? .9 : 1.1;
      schemeScale = Math.max(.5, Math.min(2.2, schemeScale));
      render(); return;
    }
    zoom *= e.deltaY > 0 ? .9 : 1.1;
    zoom = Math.max(.25, Math.min(2.5, zoom));
    render();
  }, { passive: false });

  // ---------- панель справа: программа в 2D-сборке ----------
  function showProgramDetails(p) {
    nodeTitleEl.textContent = p.name;
    const hoursNote = p.hours.total > 0 ? ` · ${p.hours.total} ч (контакт ${p.hours.contact}, СРС ${p.hours.self}).` : ' · часы уточняются.';
    nodeMetaEl.textContent = (p.format === 'ПК' ? 'Программа повышения квалификации' : 'Программа профессиональной переподготовки')
      + hoursNote + '\n' + p.goal;
    const tags = $('cmProgramTags'); tags.innerHTML = '';
    [p.format, p.hours.total > 0 ? `${p.hours.total} ч` : 'часы уточняются'].forEach((t) => {
      const s = document.createElement('span'); s.className = 'cm-tag'; s.textContent = t; tags.appendChild(s);
    });
    // входящие модули программы + её общие модули с другими программами
    const fillList = (el, rows, empty) => {
      el.innerHTML = '';
      (rows.length ? rows : [empty]).forEach((t) => {
        const li = document.createElement('li'); li.textContent = t; el.appendChild(li);
      });
    };
    const mods = (programs[programKeyByMatrixId[p.id]] || []).map(nodeBy).filter(Boolean);
    fillList($('cmModulesList'), mods.map((n) => n.label), 'Модули уточняются');
    fillList($('cmSharedList'),
      mods.filter((n) => n.shared).map((n) => `${n.label} — также в: ${n.programs.filter((x) => x !== p.name).join(', ')}`),
      'Нет общих модулей');
    const credit = ['stress-trauma', 'sexology', 'addictology'].includes(p.id)
      ? 'Клиническая база — ступени I–II «Психиатрии для психологов»: встроена в программу и перезачитывается целиком при подтверждённом освоении.'
      : (['cbt', 'hypnosis', 'transpersonal', 'pfc'].includes(p.id)
        ? 'Общие блоки с клинической базой (ступень I) перезачитываются частично при подтверждённом освоении.'
        : (p.id === 'psy1'
          ? 'Ступень I полного маршрута (240 ч): клиническая база, полностью перезачитываемая в предметные ПП.'
          : (p.id === 'psy2'
            ? 'Ступень II полного маршрута (240 ч): строится на ступени I, ведёт к дифференциальной клинике.'
            : (p.id === 'orgbiz'
              ? 'Направление в подготовке: часы и условия уточняются.'
              : 'Отдельная программа ПК: самостоятельная точка входа.'))));
    $('cmCreditInfo').innerHTML = credit + '<br><br>Перезачёт уменьшает оставшийся маршрут, но не является процентом скидки.';
  }

  // ---------- панель справа ----------
  function showBubbleDetails(b) {
    const ids = nodes.filter((n) => n.programs.includes(...b.programs) || anchorOf(n) === b.name);
    nodeTitleEl.textContent = b.name;
    nodeMetaEl.textContent = 'Фокус на кластере: он на первом плане, клиническая база посередине, остальное приглушено. Сцену можно вращать.';
    const tags = $('cmProgramTags'); tags.innerHTML = '';
    b.programs.forEach((p) => { const s = document.createElement('span'); s.className = 'cm-tag'; s.textContent = p; tags.appendChild(s); });
    [['модулей', clusterMembers(b.name).length],
     ['теория для зачёта', ids.filter((x) => x.exam).length],
     ['общих блоков', ids.filter((x) => x.shared).length],
     ['мостов / надстроек', ids.filter((x) => x.type === 'bridge' || x.type === 'addon').length]].forEach(([k, v]) => {
      const s = document.createElement('span'); s.className = 'cm-tag'; s.textContent = `${k}: ${v}`; tags.appendChild(s);
    });
    $('cmModulesList').innerHTML = '<li>—</li>';
    $('cmSharedList').innerHTML = '<li>—</li>';
    $('cmCreditInfo').innerHTML = 'Модули с жёлтым кольцом можно подтвердить на вступительном испытании теоретически. Общие модули перезачитываются между программами.';
  }
  function showDetails(n) {
    nodeTitleEl.textContent = n.label;
    nodeMetaEl.textContent = (n.note || '')
      + (n.shared ? '\nОбщий / переиспользуемый модуль.' : '')
      + (n.type === 'bridge' ? '\nПрофильная надстройка (bridge): соединяет метод и предметную область.' : '');
    const tags = $('cmProgramTags'); tags.innerHTML = '';
    n.programs.forEach((p) => { const s = document.createElement('span'); s.className = 'cm-tag'; s.textContent = p; tags.appendChild(s); });
    if (n.shared) { const s = document.createElement('span'); s.className = 'cm-tag shared'; s.textContent = 'общий модуль'; tags.appendChild(s); }
    $('cmModulesList').innerHTML = '<li>—</li>';
    $('cmSharedList').innerHTML = '<li>—</li>';
    $('cmCreditInfo').innerHTML = n.exam
      ? '<span class="cm-tag exam">теория: кандидат на вступительный зачёт / скидку</span><br><br>Практический компонент, если он есть, подтверждается отдельно.'
      : 'Автоматический перезачёт не задан. Если модуль уже пройден внутри РУСАЛЕН, повторно его не проходить.';
  }

  // ---------- тулбар ----------
  Object.keys(programs).forEach((p) => {
    const o = document.createElement('option'); o.value = p; o.textContent = 'Маршрут: ' + p; programSelect.appendChild(o);
  });
  on(programSelect, 'change', () => {
    activeProgram = programSelect.value === 'Все программы' ? null : programSelect.value;
    selectedId = null;
    selectedCluster = activeProgram ? (programToBubble[activeProgram] || null) : null;
    if (selectedCluster) { fitFocus(); showBubbleDetails(bubbleByName(selectedCluster)); }
    else zoom = 0.72;
    render();
  });
  on($('cmCollapseBtn'), 'click', (e) => { focusOnly = !focusOnly; e.currentTarget.classList.toggle('active', focusOnly); render(); });

  on(searchEl, 'input', render);
  on($('cmLabelsBtn'), 'click', (e) => { showLabels = !showLabels; e.currentTarget.classList.toggle('active', showLabels); render(); });
  on($('cmBubblesBtn'), 'click', (e) => { showBubbles = !showBubbles; e.currentTarget.classList.toggle('active', showBubbles); render(); });
  function view(y, p, z = 0.72) { yaw = y; pitch = p; zoom = z; panX = 0; panY = 20; render(); }
  on($('cmIsoBtn'), 'click', (e) => {
    schemeMode = !schemeMode;
    e.currentTarget.classList.toggle('active', schemeMode);
    e.currentTarget.textContent = schemeMode ? '2D / Изометрия' : 'Изометрия / 2D';
    $('cmLegend').style.display = schemeMode ? 'none' : '';
    if (!schemeMode) { view(-.78, -.42, .72); }
    else { schemeSelected = null; schemeHover = null; schemeScale = 1; panX = 0; panY = 20; render(); }
  });
  on($('cmResetBtn'), 'click', () => {
    selectedCluster = null; selectedId = null; activeProgram = null;
    programSelect.value = 'Все программы'; searchEl.value = '';
    focusOnly = false; schemeMode = false; schemeSelected = null; schemeHover = null; schemeScale = 1;
    $('cmLegend').style.display = '';
    $('cmCollapseBtn').classList.remove('active');
    const isoBtn = $('cmIsoBtn'); isoBtn.classList.remove('active'); isoBtn.textContent = 'Изометрия / 2D';
    view(-.78, -.42, .72);
  });

  // ---------- легенда ----------
  const legendItems = [['Фундамент', C.core], ['Медицина', C.med], ['Психотерапия', C.pt], ['ПФК', C.pfc], ['Стресс', C.stress], ['Сексология', C.sex], ['Аддиктология', C.add], ['Внедрение в психиатрии', C.stand]];
  const lg = $('cmLegend'); lg.innerHTML = '';
  legendItems.forEach(([t, c]) => {
    const d = document.createElement('span'); d.className = 'cm-chip';
    d.innerHTML = `<span class="cm-dot" style="background:${c}"></span>${t}`;
    lg.appendChild(d);
  });

  on(window, 'resize', resize);
  resize();

  return () => { disposers.forEach((d) => d()); };
}