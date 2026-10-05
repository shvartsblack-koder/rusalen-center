import React, { useEffect } from 'react';
import { initCurriculumMap } from './curriculumEngine';

export default function CurriculumMap() {
  useEffect(() => {
    const dispose = initCurriculumMap();
    return dispose;
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-210px)] min-h-[620px] rounded-xl overflow-hidden border border-white/10 bg-[radial-gradient(ellipse_at_52%_42%,#142744_0%,#0a1628_48%,#07101d_100%)]">
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-[rgba(7,14,27,0.88)] border-b border-white/10">
        <button id="cmIsoBtn" className="cm-btn">Изометрия / 2D</button>
        <button id="cmResetBtn" className="cm-btn">Сброс</button>
        <select id="cmProgramSelect" className="cm-select max-w-[240px]" aria-label="Маршрут программы" />
        <input id="cmSearch" className="cm-select w-[180px]" placeholder="Найти модуль…" />
        <button id="cmCollapseBtn" className="cm-btn">Свернуть прочее</button>
        <button id="cmLabelsBtn" className="cm-btn active">Названия</button>
        <button id="cmBubblesBtn" className="cm-btn active">Программы</button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <div id="cmStage" className="relative overflow-hidden flex-1 min-h-[380px] min-w-0">
          <canvas id="cmScene" />
          <div id="cmLegend" className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5 max-w-[75%] pointer-events-none" />
        </div>

        <aside className="h-[38vh] lg:h-auto lg:w-[340px] shrink-0 overflow-auto p-4 bg-[rgba(9,17,31,0.93)] border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="text-[11px] uppercase tracking-[0.12em] text-[#7f93af] mb-2">Выбранный модуль</div>
          <div id="cmNodeTitle" className="text-lg font-bold leading-tight mb-2">Нажмите на любой блок</div>
          <div id="cmNodeMeta" className="text-xs text-[#a9b8cd] leading-relaxed whitespace-pre-line">
            Карта интерактивна. Выберите модуль, программу или кластер, чтобы увидеть программы, контексты и правила перезачёта.
          </div>

          <div className="cm-card">
            <h3>Программы / контексты</h3>
            <div id="cmProgramTags" className="flex flex-wrap gap-1.5">
              <span className="text-[11px] text-[#8fa2bd]">—</span>
            </div>
          </div>
          <div className="cm-card">
            <h3>Входящие модули</h3>
            <ul id="cmModulesList"><li>—</li></ul>
          </div>
          <div className="cm-card">
            <h3>Общие модули (с кем)</h3>
            <ul id="cmSharedList"><li>—</li></ul>
          </div>
          <div className="cm-card">
            <h3>Перезачёт / вступительное испытание</h3>
            <div id="cmCreditInfo" className="text-[11px] text-[#8fa2bd] leading-relaxed">—</div>
          </div>
          <div className="cm-card">
            <h3>Легенда связей</h3>
            <div className="text-[11px] text-[#8fa2bd] leading-relaxed">
              <b className="text-[#e5e7eb]">Сплошная:</b> обязательная последовательность<br />
              <b className="text-[#67e8f9]">Голубая:</b> общий модуль / переиспользуется<br />
              <b className="text-[#f9a8d4]">Розовая пунктирная:</b> профильная надстройка / bridge<br />
              <b className="text-[#94a3b8]">Серая точечная:</b> смысловая связь, не prerequisite<br />
              <span className="text-[#7f93af]">В 2D-сборке:</span><br />
              <b className="text-[#57d6a2]">Зелёная:</b> клиническая база — полный перезачёт<br />
              <b className="text-[#b885ff]">Фиолетовая:</b> метод → профильное применение<br />
              <b className="text-[#50d4e8]">Голубая:</b> общий учебный блок<br />
              <b className="text-[#7c91ad]">Серая:</b> частичный перезачёт
            </div>
          </div>
        </aside>
      </div>

      <div id="cmTooltip" className="fixed z-50 pointer-events-none bg-[#06101e] text-[#e8eef8] border border-white/[0.16] rounded-lg px-2.5 py-2 text-[11px] shadow-2xl max-w-[300px]" style={{ display: 'none' }} />
    </div>
  );
}