<template>
  <AppHeader />
  <router-view />
  <AppFooter />
  <Toast ref='toastRef' />
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import Toast from './components/Toast.vue';
import { ref, provide } from 'vue';


const toastRef = ref();

function showToast(text: string) {
  toastRef.value?.show(text);
}

provide('toast', showToast);
</script>
