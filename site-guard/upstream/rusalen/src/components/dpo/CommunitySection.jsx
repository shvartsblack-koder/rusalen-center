import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { mailtoHref } from '@/lib/mailto';

export default function CommunitySection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader label="Сообщество" title="Обсуждать практику и продолжать учиться" />
        <div className="glass rounded-xl p-6 sm:p-8 max-w-3xl mt-8">
          <Users className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Развиваем ассоциацию «Клинический навигатор» как отдельное профессиональное сообщество
            для обсуждения случаев, выбора методов и последовательности помощи. Ассоциация задумана
            независимо от отдельных курсов: завершение обучения не означает завершения
            профессионального общения.
          </p>
          <p className="text-xs text-muted-foreground/70 mb-6">
            Участие добровольное. Условия вступления, доступные встречи и формат работы сообщим
            отдельно. Участие в ассоциации и доступ к материалам завершённого курса регулируются
            раздельно.
          </p>
          <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/10">
            <a href={mailtoHref('Клинический навигатор — условия участия')}>
              Узнать об ассоциации
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}