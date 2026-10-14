import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useAuthStore } from './auth';

export const useFavoritesStore = defineStore('favorites', () => {
  const auth = useAuthStore();
  const key = `favorites_${auth.user.phone || 'guest'}`;
  const items = ref<any[]>(JSON.parse(localStorage.getItem(key) || '[]'));

  watch(items, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal));
  }, { deep: true });

  function toggleLike(product: any) {
    const index = items.value.findIndex((i) => i.id === product.id);
    if (index === -1) {
      items.value.push(product);
      return true;
    } else {
      items.value.splice(index, 1);
      return false;
    }
  }

  function isLiked(id: number) {
    return items.value.some((i) => i.id === id);
  }

  function removeItem(id: number) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  return { items, toggleLike, isLiked, removeItem };
});
