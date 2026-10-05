import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, ExternalLink, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const typeLabels = {
  psychological: 'Психологический центр', crisis: 'Кризисный центр',
  psychiatric: 'Психиатрическая клиника', rehabilitation: 'Реабилитация',
  veteran_org: 'Ветеранская орг.', legal: 'Юридическая помощь', social: 'Социальная служба',
};
const typeColors = {
  psychological: 'bg-blue-500/10 text-blue-700', crisis: 'bg-red-500/10 text-red-700',
  psychiatric: 'bg-purple-500/10 text-purple-700', rehabilitation: 'bg-emerald-500/10 text-emerald-700',
  veteran_org: 'bg-amber-500/10 text-amber-700', legal: 'bg-slate-500/10 text-slate-700',
  social: 'bg-teal-500/10 text-teal-700',
};

function MapPlaceholder({ centers }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 rounded-xl overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `repeating-linear-gradient(0deg, #94a3b8 0, #94a3b8 1px, transparent 0, transparent 50%),
          repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 1px, transparent 0, transparent 50%)`,
        backgroundSize: '40px 40px'
      }} />
      {centers.map((c, i) => (
        <div key={i} style={{ position: 'absolute', left: `${20 + (i * 17) % 60}%`, top: `${20 + (i * 23) % 55}%` }}>
          <div className="relative group">
            <div className="w-8 h-8 rounded-full bg-primary shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl p-2 shadow-lg min-w-32 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <p className="text-xs font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.city}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="text-center text-muted-foreground z-10 bg-white/80 rounded-xl p-4">
        <MapPin className="w-8 h-8 mx-auto mb-2" />
        <p className="text-sm font-medium">Карта центров помощи</p>
        <p className="text-xs mt-1">Интеграция с Яндекс.Картами</p>
      </div>
    </div>
  );
}

export default function HelpMap() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selected, setSelected] = useState(null);

  const { data: centers = [] } = useQuery({
    queryKey: ['help-centers'],
    queryFn: () => base44.entities.HelpCenter.list('-rating', 50),
  });

  const filtered = centers.filter(c => {
    const matchSearch = c.name?.toLowerCase().includes(search.toLowerCase()) || c.city?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || c.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-screen flex flex-col">
      {/* Header */}
      <div className="shrink-0 p-4 sm:p-6 border-b border-border bg-background">
        <h1 className="text-xl font-display font-bold text-foreground mb-4">Карта помощи</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск организаций..." className="pl-9 rounded-xl" />
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground min-w-44">
            <option value="all">Все категории</option>
            {Object.entries(typeLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* List */}
        <div className="w-full lg:w-96 shrink-0 overflow-y-auto border-r border-border">
          {filtered.length === 0 ? (
            <div className="p-6 text-center">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Организации не найдены</p>
            </div>
          ) : filtered.map(c => (
            <motion.div key={c.id} onClick={() => setSelected(c)}
              className={`p-4 border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${selected?.id === c.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
              whileHover={{ x: 2 }}>
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-semibold text-sm text-foreground leading-tight">{c.name}</h3>
                {c.rating && (
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold">{c.rating}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[c.type] || 'bg-muted text-muted-foreground'}`}>
                  {typeLabels[c.type] || c.type}
                </span>
                {c.is_24h && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700">24/7</span>}
                {c.accepts_emergency && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-700">Экстренные</span>}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />{c.city}{c.address && `, ${c.address}`}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map + Detail */}
        <div className="hidden lg:flex flex-1 flex-col">
          <div className="flex-1 p-4"><MapPlaceholder centers={filtered.slice(0, 10)} /></div>
          {selected && (
            <div className="shrink-0 border-t border-border bg-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{selected.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[selected.type] || ''}`}>{typeLabels[selected.type]}</span>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Phone className="w-4 h-4 text-primary" />{selected.phone}
                  </a>
                )}
                {selected.working_hours && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />{selected.working_hours}
                  </div>
                )}
                {selected.website && (
                  <a href={selected.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                    <ExternalLink className="w-4 h-4" />Сайт
                  </a>
                )}
              </div>
              {selected.description && <p className="text-xs text-muted-foreground mt-2">{selected.description}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}