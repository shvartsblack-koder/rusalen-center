import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLeadModal } from '@/components/LeadModal';
import PageHero from '../components/shared/PageHero';
import SectionHeader from '../components/shared/SectionHeader';
import GlassCard from '../components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock, Monitor, Award, Users, Filter } from 'lucide-react';

// Прежние разделы /education/<категория> (URL из sitemap) — живут рядом с новым разделом ДПО РУСАЛЕН (/education).
const categories = [
  { value: 'dpo', label: 'ДПО РУСАЛЕН' },
  { value: 'qualification', label: 'Повышение квалификации' },
  { value: 'retraining', label: 'Профессиональная переподготовка' },
  { value: 'fundamental', label: 'Фундаментальное образование' },
  { value: 'publishing', label: 'Издательство Русален' },
];

const heroByCategory = {
  fundamental: { title: 'Фундаментальное образование', description: 'Системное классическое психологическое образование — от теории до исследовательской практики' },
  retraining: { title: 'Профессиональная переподготовка', description: 'Программы переподготовки для специалистов, осваивающих психологическую профессию' },
  qualification: { title: 'Повышение квалификации', description: 'Краткосрочные и модульные программы для действующих психологов и смежных специалистов' },
  publishing: { title: 'Издательство Русален', description: 'Научные и образовательные издания центра: монографии, учебные пособия, переводы' },
};

const formatLabels = { online: 'Онлайн', offline: 'Очно', hybrid: 'Гибрид' };
const levelLabels = { beginner: 'Начальный', intermediate: 'Средний', advanced: 'Продвинутый' };

export default function EducationCategory() {
  const { category } = useParams();
  const [filters, setFilters] = useState({ format: 'all', level: 'all' });
  const { openLeadModal } = useLeadModal();
  const activeCategory = heroByCategory[category] ? category : null;
  const hero = activeCategory ? heroByCategory[activeCategory] : null;

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.list(),
    initialData: [],
  });

  if (!activeCategory) return <Navigate to="/education" replace />;

  const filtered = courses.filter((c) => {
    if (c.category !== activeCategory) return false;
    if (filters.format !== 'all' && c.format !== filters.format) return false;
    if (filters.level !== 'all' && c.level !== filters.level) return false;
    return c.is_published !== false;
  });

  return (
    <div>
      <PageHero
        label="Образование"
        title={hero.title}
        description={hero.description}
      />

      {/* Subcategory tabs */}
      <section className="py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                to={cat.value === 'dpo' ? '/education' : `/education/${cat.value}`}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground glass'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filters.format} onValueChange={(v) => setFilters({ ...filters, format: v })}>
              <SelectTrigger className="w-36 bg-secondary border-border text-sm"><SelectValue placeholder="Формат" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все форматы</SelectItem>
                <SelectItem value="online">Онлайн</SelectItem>
                <SelectItem value="offline">Очно</SelectItem>
                <SelectItem value="hybrid">Гибрид</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.level} onValueChange={(v) => setFilters({ ...filters, level: v })}>
              <SelectTrigger className="w-40 bg-secondary border-border text-sm"><SelectValue placeholder="Уровень" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="beginner">Начальный</SelectItem>
                <SelectItem value="intermediate">Средний</SelectItem>
                <SelectItem value="advanced">Продвинутый</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-2">Программы будут опубликованы в ближайшее время</p>
              <p className="text-xs text-muted-foreground/60">Следите за обновлениями на нашем сайте</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, i) => (
                <GlassCard key={course.id} delay={i * 0.08}>
                  {course.image_url && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 -mx-2 -mt-2">
                      <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.format && <Badge variant="secondary" className="text-[10px] font-mono">{formatLabels[course.format] || course.format}</Badge>}
                    {course.level && <Badge variant="outline" className="text-[10px] font-mono border-border/50">{levelLabels[course.level] || course.level}</Badge>}
                    {course.has_certificate && <Badge className="bg-primary/10 text-primary text-[10px] font-mono">Сертификат</Badge>}
                  </div>
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    {course.duration && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>}
                    {course.instructors && <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.instructors}</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    {course.price ? (
                      <span className="text-primary font-semibold">{course.price.toLocaleString()} ₽</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">Бесплатно</span>
                    )}
                    <Button size="sm" onClick={openLeadModal} className="bg-primary text-primary-foreground hover:bg-primary/80 text-xs">
                      Записаться
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}