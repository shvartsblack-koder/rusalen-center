import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Eye, Hand, Wind, Play, Pause, RotateCcw, Volume2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const musicCategories = [
  { label: 'Управление тревогой', tracks: ['История Маяк', 'История Попутный ветер', 'История Горка'], color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Стабилизация', tracks: ['История Феникс', 'История Феникс', 'История Космос'], color: 'bg-purple-500/10 text-purple-600' },
  { label: 'Помощь при бессоннице', tracks: ['Мир в душе', 'Песчаный замок', 'Медведь в спячке'], color: 'bg-indigo-500/10 text-indigo-600' },

];

const groundingSteps = [
  { n: 5, label: 'предметов, которые вы видите', color: 'text-blue-500' },
  { n: 4, label: 'вещи, которые можно потрогать', color: 'text-emerald-500' },
  { n: 3, label: 'звука, которые вы слышите', color: 'text-amber-500' },
  { n: 2, label: 'запаха, которые вы чувствуете', color: 'text-purple-500' },
  { n: 1, label: 'вкус, который вы ощущаете', color: 'text-red-500' },
];

function BreathingCircle() {
  const [phase, setPhase] = useState('Вдох');
  const [count, setCount] = useState(4);
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(1);
  const timerRef = useRef(null);

  const phases = [
    { label: 'Вдох', duration: 4, targetScale: 1.5 },
    { label: 'Задержка', duration: 7, targetScale: 1.5 },
    { label: 'Выдох', duration: 8, targetScale: 1 },
  ];
  const phaseIndex = useRef(0);

  useEffect(() => {
    if (!active) { clearInterval(timerRef.current); return; }
    const runPhase = () => {
      const p = phases[phaseIndex.current];
      setPhase(p.label);
      setCount(p.duration);
      setScale(p.targetScale);
      let c = p.duration;
      timerRef.current = setInterval(() => {
        c--;
        setCount(c);
        if (c <= 0) {
          clearInterval(timerRef.current);
          phaseIndex.current = (phaseIndex.current + 1) % phases.length;
          runPhase();
        }
      }, 1000);
    };
    runPhase();
    return () => clearInterval(timerRef.current);
  }, [active]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52 flex items-center justify-center mb-6">
        <motion.div animate={{ scale }} transition={{ duration: phases[phaseIndex.current]?.duration || 4, ease: 'linear' }}
          className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40" />
        <motion.div animate={{ scale: scale * 0.7 }} transition={{ duration: phases[phaseIndex.current]?.duration || 4, ease: 'linear' }}
          className="absolute w-24 h-24 rounded-full bg-primary/20" />
        <div className="relative text-center z-10">
          <div className="text-2xl font-bold text-primary">{count}</div>
          <div className="text-sm text-muted-foreground">{phase}</div>
        </div>
      </div>
      <Button onClick={() => { setActive(!active); phaseIndex.current = 0; }} className="rounded-xl w-40">
        {active ? <><Pause className="w-4 h-4 mr-2" />Стоп</> : <><Play className="w-4 h-4 mr-2" />Начать</>}
      </Button>
    </div>
  );
}

function MetronomeVisual() {
  const [bpm, setBpm] = useState(60);
  const [active, setActive] = useState(false);
  const [beat, setBeat] = useState(false);
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setBeat(b => !b), (60 / bpm) * 1000);
    return () => clearInterval(interval);
  }, [active, bpm]);
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div animate={{ scale: beat && active ? 1.3 : 1, backgroundColor: beat && active ? '#3b82f6' : '#e2e8f0' }}
        transition={{ duration: 0.1 }}
        className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-foreground">
        {bpm}
      </motion.div>
      <div className="text-sm text-muted-foreground">уд/мин</div>
      <input type="range" min={40} max={120} value={bpm} onChange={e => setBpm(Number(e.target.value))} className="w-40" />
      <Button onClick={() => setActive(!active)} className="rounded-xl w-32">
        {active ? <><Pause className="w-4 h-4 mr-2" />Стоп</> : <><Play className="w-4 h-4 mr-2" />Старт</>}
      </Button>
    </div>
  );
}

function AvStimList() {
  const [audio, setAudio] = useState(null);   // 'headphones' | 'speaker'
  const [visual, setVisual] = useState(null); // 'eyes_closed' | 'no_visual'
  const [sync, setSync] = useState(null);     // 'none' | 'neuroband' | 'fitness'

  const canContinue = audio !== null && visual !== null && sync !== null;

  const CheckItem = ({ active, onClick, label }) => (
    <div onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30 hover:bg-muted/60 border border-transparent'}`}>
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${active ? 'bg-primary border-primary' : 'border-border bg-card'}`}>
        {active && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Аудио</p>
        <div className="space-y-2">
          <CheckItem active={audio === 'headphones'} onClick={() => setAudio('headphones')} label="Слушаю в наушниках" />
          <CheckItem active={audio === 'speaker'} onClick={() => setAudio('speaker')} label="Слушаю без наушников" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Визуал</p>
        <div className="space-y-2">
          <CheckItem active={visual === 'eyes_closed'} onClick={() => setVisual('eyes_closed')} label="Могу закрыть глаза и положить на них телефон" />
          <CheckItem active={visual === 'no_visual'} onClick={() => setVisual('no_visual')} label="Без визуала" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Синхронизировать с</p>
        <div className="space-y-2">
          <CheckItem active={sync === 'none'} onClick={() => setSync('none')} label="Нет" />
          <CheckItem active={sync === 'neuroband'} onClick={() => setSync('neuroband')} label="Нейробэнд" />
          <CheckItem active={sync === 'fitness'} onClick={() => setSync('fitness')} label="Фитнесс-браслет" />
          <CheckItem active={sync === 'camera'} onClick={() => setSync('camera')} label="Пульс через камеру" />
          <CheckItem active={sync === 'mic'} onClick={() => setSync('mic')} label="Дыхание через микрофон (я в тихом месте)" />
        </div>
      </div>
      <Button className="w-full rounded-xl" disabled={!canContinue}>
        Продолжить
      </Button>
    </div>
  );
}

export default function SelfHelp() {
  const [activeSection, setActiveSection] = useState('breathing');

  const sections = [
    { id: 'breathing', label: 'Дыхание', icon: Wind },
    { id: 'music', label: 'Сенсорная репродукция', icon: Music },
    { id: 'visual', label: 'Аудио-визуальная стабилизация', icon: Eye },
    { id: 'grounding', label: 'Упражнения заземления', icon: Hand },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Антикризисный центр</h1>
        <p className="text-muted-foreground">Инструменты самопомощи и стабилизации состояния</p>
      </div>

      {/* Section tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {sections.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${activeSection === s.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:border-primary/30'}`}>
            <s.icon className="w-5 h-5" />
            <span className="text-xs font-medium text-center">{s.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSection === 'breathing' && (
          <motion.div key="breathing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center">
                <h3 className="font-semibold text-foreground mb-2 self-start">Дыхательный круг 4-7-8</h3>
                <p className="text-sm text-muted-foreground mb-6 self-start">Техника снижения тревоги и засыпания</p>
                <BreathingCircle />
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center">
                <h3 className="font-semibold text-foreground mb-2 self-start">Метроном</h3>
                <p className="text-sm text-muted-foreground mb-6 self-start">Синхронизация дыхания с ритмом</p>
                <MetronomeVisual />
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'music' && (
          <motion.div key="music" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <span className="text-2xl leading-none">🎧</span>
              <p className="text-sm text-blue-800 font-medium">Закройте глаза — всё будет происходить в воображении. Желательно надеть наушники.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {musicCategories.map((cat, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-5">
                  <h3 className={`inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4 ${cat.color}`}>{cat.label}</h3>
                  <div className="space-y-2">
                    {cat.tracks.map((t, j) => (
                      <div key={j} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Volume2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{t}</span>
                        </div>
                        <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'visual' && (
          <motion.div key="visual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">EMDR-паттерн</h3>
                <div className="relative h-32 bg-muted rounded-xl overflow-hidden">
                  <motion.div animate={{ x: ['0%', '85%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 -translate-y-1/2 left-4 w-8 h-8 rounded-full bg-primary shadow-lg shadow-primary/40" />
                </div>
                <p className="text-xs text-muted-foreground mt-3">Следите глазами за движущимся объектом. 5-10 минут.</p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Аудио-визуальная стимуляция</h3>
                <AvStimList />
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'grounding' && (
          <motion.div key="grounding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-2">Техника «5-4-3-2-1»</h3>
              <p className="text-sm text-muted-foreground mb-6">Заземляющее упражнение при панических состояниях</p>
              <div className="space-y-4">
                {groundingSteps.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                    <div className={`text-4xl font-display font-bold ${s.color} w-12 text-center shrink-0`}>{s.n}</div>
                    <div>
                      <p className="font-medium text-foreground">Назовите {s.n} {s.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm text-primary font-medium">Тактильное упражнение:</p>
                <p className="text-sm text-muted-foreground mt-1">Сожмите и разожмите кулаки 10 раз. Обратите внимание на ощущение в руках — тепло, давление, расслабление.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}