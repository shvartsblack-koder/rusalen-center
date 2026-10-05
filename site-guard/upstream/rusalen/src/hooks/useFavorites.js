import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function useFavorites() {
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) return [];
      return base44.entities.Favorite.list('-created_date');
    },
  });

  const favoritedIds = new Set(favorites.map((f) => f.item_id));

  const addMutation = useMutation({
    mutationFn: ({ item_id, item_title, item_type }) =>
      base44.entities.Favorite.create({ item_id, item_title, item_type }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const removeMutation = useMutation({
    mutationFn: (favoriteId) => base44.entities.Favorite.delete(favoriteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const toggle = async (item) => {
    const isAuth = await base44.auth.isAuthenticated();
    if (!isAuth) {
      base44.auth.redirectToLogin(window.location.pathname);
      return;
    }
    const existing = favorites.find((f) => f.item_id === item.id);
    if (existing) {
      removeMutation.mutate(existing.id);
    } else {
      addMutation.mutate({ item_id: item.id, item_title: item.title, item_type: item.type });
    }
  };

  return { favorites, favoritedIds, toggle, isLoading };
}