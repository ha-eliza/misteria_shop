<template>
  <div class="min-h-screen bg-white text-black py-10 mt-[64px]">
    <div class="max-w-[680px] mx-auto px-4">

      <h1 class="text-2xl font-bold mb-6">Личный кабинет</h1>

      <div class="flex border-b border-gray-200 mb-6">
        <button
          @click="activeTab = 'cart'"
          :class="['flex-1 py-3 text-sm font-medium transition', activeTab === 'cart' ? 'border-b-2 border-black' : 'text-gray-500']"
        >
          Корзина
        </button>
        <button
          @click="activeTab = 'favorites'"
          :class="['flex-1 py-3 text-sm font-medium transition', activeTab === 'favorites' ? 'border-b-2 border-black' : 'text-gray-500']"
        >
          Лайки
        </button>
      </div>

      <div v-if="activeTab === 'cart'">
        <div v-if="cart.items.length === 0" class="text-center text-gray-400 py-10">
          Корзина пуста
        </div>
        <div v-else class="flex flex-col gap-4">
          <div data-test="cart-item" v-for="item in cart.items" :key="item.id" class="flex gap-4 border-b border-gray-100 pb-4">
            <img :src="item.thumbnail" class="w-20 h-20 object-contain" />
            <div class="flex-1">
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-sm text-gray-500">{{ item.price }} ₽</p>
            </div>
            <button @click="cart.removeItem(item.id)" class="text-sm text-gray-400 hover:text-black">
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'favorites'">
        <div v-if="favorites.items.length === 0" class="text-center text-gray-400 py-10">
          Лайков пока нет
        </div>
        <div v-else class="flex flex-col gap-4">
          <div v-for="item in favorites.items" :key="item.id" class="flex gap-4 border-b border-gray-100 pb-4">
            <img :src="item.thumbnail" class="w-20 h-20 object-contain" />
            <div class="flex-1">
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-sm text-gray-500">{{ item.price }} ₽</p>
            </div>
            <button @click="favorites.removeItem(item.id)" class="text-sm text-gray-400 hover:text-black">
              Удалить
            </button>
          </div>
        </div>
      </div>

      <button
        @click="logout"
        class="w-full mt-10 bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition"
      >
        Выйти
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import { useFavoritesStore } from '../stores/favorites';

const auth = useAuthStore();
const cart = useCartStore();
const favorites = useFavoritesStore();
const router = useRouter();

const activeTab = ref<'cart' | 'favorites'>('cart');

function logout() {
  auth.logout();
  router.push('/');
}
</script>
