import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import PageHero from '@/components/shared/PageHero';
import GlassCard from '@/components/shared/GlassCard';
import TopicForm from '@/components/forum/TopicForm';
import { Button } from '@/components/ui/button';
import { MessageSquare, FileText, FlaskConical, Plus, Loader2, ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const CATEGORIES = [
  { id: 'all', label: 'Все', icon: MessageSquare },
  { id: 'supertopic', label: 'Супертемы', icon: Sparkles },
  { id: 'publication', label: 'Публикации', icon: FileText },
  { id: 'method', label: 'Методики', icon: FlaskConical },
  { id: 'general', label: 'Общее', icon: MessageSquare },
];

export default function Forum() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTopics();
    base44.auth.me().then(setUser).catch(() => setUser(null)).finally(() => setAuthChecked(true));
  }, []);

  const loadTopics = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.ForumTopic.list('-created_date', 100);
      setTopics(data);
    } catch (e) {
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (payload) => {
    await base44.entities.ForumTopic.create({
      ...payload,
      author_name: user?.full_name || 'Психолог',
      author_id: user?.id,
    });
    setShowForm(false);
    loadTopics();
  };

  const filtered = activeCategory === 'all'
    ? topics
    : topics.filter((t) => t.category === activeCategory);

  return (
    <div>
      <PageHero
        label="Сообщество"
        title="Форум психологов"
        description="Профессиональное пространство для обсуждения научных публикаций, методик и практики"
      />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${
                      activeCategory === c.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {c.label}
                  </button>
                );
              })}
            </div>

            {authChecked && user && (
              <Button onClick={() => setShowForm(!showForm)} variant="outline" className="gap-2 shrink-0">
                {showForm ? <ArrowLeft className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showForm ? 'К списку тем' : 'Новая тема'}
              </Button>
            )}
          </div>

          {/* Auth prompt */}
          {authChecked && !user && (
            <GlassCard className="mb-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Войдите как зарегистрированный психолог, чтобы создавать темы и участвовать в обсуждениях
              </p>
              <Button asChild className="gap-2">
                <Link to="/login">Войти</Link>
              </Button>
            </GlassCard>
          )}

          {/* Create form */}
          {showForm && user && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <TopicForm onSubmit={handleCreate} />
            </motion.div>
          )}

          {/* Topics list */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 glass rounded-2xl">
              <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
              <p className="text-muted-foreground text-sm">Пока нет тем в этой категории</p>
              {user && (
                <p className="text-muted-foreground/60 text-xs mt-1">Создайте первую тему для обсуждения</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((topic, i) => {
                const cat = CATEGORIES.find((c) => c.id === topic.category) || CATEGORIES[3];
                const Icon = cat.icon;
                return (
                  <Link key={topic.id} to={`/forum/topic/${topic.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="glass rounded-xl p-5 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-primary/80">
                              {cat.label}
                            </span>
                            {topic.is_closed && (
                              <Lock className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                          <h3 className="font-display text-lg font-medium group-hover:text-primary transition-colors mb-1 line-clamp-1">
                            {topic.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {topic.content}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{topic.author_name || 'Психолог'}</span>
                            <span>·</span>
                            <span>{format(new Date(topic.created_date), 'd MMM yyyy', { locale: ru })}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}