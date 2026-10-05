import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Calendar, Star, Heart, MessageCircle, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const categoryConfig = {
  support_group: { label: 'Группа поддержки', color: 'bg-emerald-500/10 text-emerald-700' },
  forum: { label: 'Форум', color: 'bg-blue-500/10 text-blue-700' },
  event: { label: 'Мероприятие', color: 'bg-purple-500/10 text-purple-700' },
  mentorship: { label: 'Наставничество', color: 'bg-amber-500/10 text-amber-700' },
  comrades_search: { label: 'Поиск сослуживцев', color: 'bg-rose-500/10 text-rose-700' },
};

export default function Community() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'forum' });
  const qc = useQueryClient();

  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: () => base44.entities.CommunityPost.list('-created_date', 50),
  });

  const createPost = useMutation({
    mutationFn: (data) => base44.entities.CommunityPost.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['posts'] }); setShowCreate(false); setNewPost({ title: '', content: '', category: 'forum' }); },
  });

  const filtered = posts.filter(p => {
    const matchTab = tab === 'all' || p.category === tab;
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-1">Сообщество</h1>
          <p className="text-muted-foreground">Закрытая социальная сеть для взаимной поддержки</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} className="rounded-xl">
          <Plus className="w-4 h-4 mr-2" />Написать
        </Button>
      </div>

      {showCreate && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-5 mb-6">
          <h3 className="font-semibold mb-3">Новая публикация</h3>
          <div className="space-y-3">
            <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm">
              {Object.entries(categoryConfig).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
            </select>
            <Input placeholder="Заголовок" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} className="rounded-xl" />
            <textarea placeholder="Расскажите о себе или задайте вопрос..." value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => createPost.mutate(newPost)} disabled={!newPost.title || !newPost.content} className="rounded-xl">Опубликовать</Button>
              <Button size="sm" variant="outline" onClick={() => setShowCreate(false)} className="rounded-xl">Отмена</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button onClick={() => setTab('all')} className={`text-sm px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${tab === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border'}`}>Все</button>
        {Object.entries(categoryConfig).map(([v, { label }]) => (
          <button key={v} onClick={() => setTab(v)} className={`text-sm px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${tab === v ? 'bg-primary text-primary-foreground border-primary' : 'border-border'}`}>{label}</button>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск в сообществе..." className="pl-9 rounded-xl" />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Публикаций пока нет. Будьте первым!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{(p.author_name || 'А')[0]}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{p.author_name || 'Аноним'}</span>
                    {p.is_pinned && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700">Закреплено</span>}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${categoryConfig[p.category]?.color || 'bg-muted text-muted-foreground'}`}>
                  {categoryConfig[p.category]?.label || p.category}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{p.content}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart className="w-3.5 h-3.5" />{p.likes_count || 0}</button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors"><MessageCircle className="w-3.5 h-3.5" />{p.comments_count || 0}</button>
                {p.tags?.map(t => <span key={t} className="text-primary/60">#{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}