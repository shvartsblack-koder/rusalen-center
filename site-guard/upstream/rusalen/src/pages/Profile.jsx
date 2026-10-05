import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useFavorites } from '@/hooks/useFavorites';
import PageHero from '../components/shared/PageHero';
import LibraryItemCard from '../components/library/LibraryItemCard';
import ProfileRoles from '../components/profile/ProfileRoles';
import GlassCard from '../components/shared/GlassCard';
import { User, BookMarked, Mail, Calendar, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    base44.auth.me().then(setUser).finally(() => setLoadingUser(false));
  }, []);

  const { favorites, isLoading: favLoading } = useFavorites();

  // Load full items for favorited IDs
  const { data: allItems = [] } = useQuery({
    queryKey: ['media-library'],
    queryFn: () => base44.entities.MediaLibraryItem.filter({ is_published: true }, '-created_date', 200),
  });

  const favItemIds = new Set(favorites.map((f) => f.item_id));
  const favItems = allItems.filter((item) => favItemIds.has(item.id));

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <PageHero label="Профиль" title="Личный кабинет" />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* User info card */}
          <GlassCard className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-display text-2xl font-bold mb-1">{user?.full_name || 'Пользователь'}</h2>
              {user?.email && (
                <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
              )}
              {user?.created_date && (
                <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Участник с {format(new Date(user.created_date), 'MMMM yyyy', { locale: ru })}
                </p>
              )}
            </div>
            <div className="sm:ml-auto glass rounded-xl px-6 py-4 text-center shrink-0">
              <BookMarked className="w-6 h-6 text-primary mx-auto mb-1" />
              <span className="text-2xl font-display font-bold text-gold-gradient">{favorites.length}</span>
              <p className="text-[11px] text-muted-foreground font-mono">в избранном</p>
            </div>
          </GlassCard>

          {/* Roles */}
          <ProfileRoles
            roles={user?.roles ?? []}
            onChange={(roles) => setUser((u) => ({ ...u, roles }))}
          />

          {/* Favorites section */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
              <BookMarked className="w-4 h-4" /> Сохранённые материалы
            </h3>

            {favLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="glass rounded-xl p-5 animate-pulse h-48" />
                ))}
              </div>
            ) : favItems.length === 0 ? (
              <div className="text-center py-20 glass rounded-2xl">
                <BookMarked className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
                <p className="text-muted-foreground text-sm">Вы ещё не добавили материалы в избранное</p>
                <p className="text-muted-foreground/60 text-xs mt-1">
                  Нажмите на ♡ на карточке материала в библиотеке
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favItems.map((item, i) => (
                  <LibraryItemCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}