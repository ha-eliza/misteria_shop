import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', () => {
  const auth = useAuthStore();
  const key = `cart_${auth.user.phone || 'guest'}`;
  const items = ref<any[]>(JSON.parse(localStorage.getItem(key) || '[]'));

  watch(items, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal));
  }, { deep: true });

  function addItem(product: any) {
    items.value.push(product);
  }

  function removeItem(id: number) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  function clearCart() {
    items.value = [];
  }

  return { items, addItem, removeItem, clearCart };
});
