import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import GlassCard from '@/components/shared/GlassCard';
import ReplyForm from '@/components/forum/ReplyForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, MessageSquare, Lock, UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const CATEGORY_LABELS = {
  supertopic: 'Супертема',
  publication: 'Научные публикации',
  method: 'Методики',
  general: 'Общие обсуждения',
};

export default function ForumTopic() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    loadData();
    base44.auth.me().then(setUser).catch(() => setUser(null)).finally(() => setAuthChecked(true));
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const t = await base44.entities.ForumTopic.get(id);
      setTopic(t);
      const r = await base44.entities.ForumReply.filter({ topic_id: id }, 'created_date', 200);
      setReplies(r);
    } catch (e) {
      setTopic(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (content) => {
    await base44.entities.ForumReply.create({
      topic_id: id,
      topic_title: topic?.title,
      content,
      author_name: user?.full_name || 'Психолог',
      author_id: user?.id,
    });
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-muted-foreground">Тема не найдена</p>
        <Button asChild variant="outline" className="gap-2">
          <Link to="/forum"><ArrowLeft className="w-4 h-4" /> На форум</Link>
        </Button>
      </div>
    );
  }

  const isClosed = topic.is_closed;

  return (
    <div className="pt-20">
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/forum" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Все темы
          </Link>

          {/* Topic */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary/80 px-2 py-0.5 rounded bg-primary/10">
                  {CATEGORY_LABELS[topic.category] || 'Обсуждение'}
                </span>
                {isClosed && (
                  <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <Lock className="w-3 h-3" /> Закрыто
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">{topic.title}</h1>
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/40">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{topic.author_name || 'Психолог'}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(topic.created_date), 'd MMMM yyyy, HH:mm', { locale: ru })}
                  </p>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{topic.content}</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Replies */}
          <div className="mb-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Ответы ({replies.length})
            </h2>

            {replies.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Пока нет ответов. Будьте первым!</p>
            ) : (
              <div className="space-y-3">
                {replies.map((reply, i) => (
                  <motion.div
                    key={reply.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <GlassCard>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <UserCircle className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{reply.author_name || 'Психолог'}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(reply.created_date), 'd MMM yyyy, HH:mm', { locale: ru })}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm">{reply.content}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Reply form */}
          {authChecked && (
            isClosed ? (
              <GlassCard className="text-center">
                <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">Тема закрыта для новых ответов</p>
              </GlassCard>
            ) : user ? (
              <ReplyForm onSubmit={handleReply} />
            ) : (
              <GlassCard className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Войдите, чтобы оставить ответ</p>
                <Button asChild className="gap-2">
                  <Link to="/login">Войти</Link>
                </Button>
              </GlassCard>
            )
          )}
        </div>
      </section>
    </div>
  );
}