import React from 'react';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import { Brain, Globe, Activity, Calculator, BookOpen, Briefcase } from 'lucide-react';

const labs = [
  { icon: Brain, name: 'Лаборатория клинической психологии', focus: 'Клинико-психологическая диагностика, психотерапия, доказательные практики, психосоматические расстройства, телесная терапия, биомаркеры', lead: 'Руководитель: TBD' },
  { icon: Activity, name: 'Лаборатория психофизиологии, нейрокогнитивных исследований и нейротехнологий', focus: 'Психофизиология, нейровизуализация, когнитивные процессы, нейроинтерфейсы и нейротехнологии, генетика поведения, эпигенетика, биохимия стресса', lead: 'Руководитель: TBD' },
  { icon: Calculator, name: 'Лаборатория математической психологии, моделирования психических процессов и ИИ', focus: 'Математическое моделирование, вычислительная психология, машинное обучение, ИИ в исследованиях психики', lead: 'Руководитель: TBD' },
  { icon: BookOpen, name: 'Лаборатория философии и истории психологии', focus: 'Философские основания психологии, методология науки, философия сознания', lead: 'Руководитель: TBD' },
  { icon: Globe, name: 'Центр системных междисциплинарных и кросс-культурных исследований', focus: 'Этнопсихология, межкультурная коммуникация', lead: 'Руководитель: TBD' },
  { icon: Briefcase, name: 'Лаборатория психологии труда, эргономики, инженерной и организационной психологии', focus: 'Психология труда, эргономика, инженерная и организационная психология, проектирование рабочих сред', lead: 'Руководитель: TBD' },
  { icon: Briefcase, name: 'Прикладной центр разработки образовательных и корпоративных решений', focus: 'Образовательные программы, корпоративное консультирование, прикладные психологические решения для бизнеса и образования', lead: 'Руководитель: TBD' },
];

export default function Labs() {
  return (
    <div>
      <PageHero label="Лаборатории" title="Лаборатории и исследовательские группы" description="Научно-исследовательские подразделения РУСАЛЕН" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map((lab, i) => (
              <GlassCard key={i} delay={i * 0.1}>
                <lab.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold mb-2">{lab.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{lab.focus}</p>
                <p className="text-[10px] font-mono text-primary">{lab.lead}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}