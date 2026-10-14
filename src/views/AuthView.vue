<template>
  <div class="min-h-screen bg-white text-black py-10 mt-[64px]">
    <div class="max-w-[680px] mx-auto px-4">

      <h1 class="text-2xl font-bold mb-6">Вход</h1>

      <input
        v-model="phone"
        type="tel"
        placeholder="+7 999 123-45-67"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:border-black"
      />

      <button
        @click="login"
        class="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition"
      >
        Войти
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const phone = ref('');
const auth = useAuthStore();
const router = useRouter();

function login() {
  if (!phone.value) return;
  auth.login(phone.value);
  window.location.href = '/profile';
  router.push('/profile');
}
</script>
