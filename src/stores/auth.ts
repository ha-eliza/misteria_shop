import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface User {
  phone: string;
}

export const useAuthStore = defineStore('auth', () => {
  const saved = localStorage.getItem('user');
  const user = ref<User>(saved ? JSON.parse(saved) : { phone: '' });
  const isLoggedIn = ref<boolean>(!!saved);

  watch(user, (newVal) => {
    localStorage.setItem('user', JSON.stringify(newVal));
    isLoggedIn.value = !!newVal.phone;
  }, { deep: true });

  function login(phone: string) {
    user.value.phone = phone;
    isLoggedIn.value = true;
  }

  function updateProfile(phone: string) {
    user.value.phone = phone;
  }

  function logout() {
    user.value = { phone: '' };
    isLoggedIn.value = false;
    localStorage.removeItem('user');
  }

  return { user, isLoggedIn, login, updateProfile, logout };
});
