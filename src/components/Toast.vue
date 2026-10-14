<template>
  <div
    v-if="visible"
    class="fixed bottom-6 right-6 bg-black text-white text-sm px-6 py-3 rounded-lg shadow-lg z-50 transition"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const message = ref('');

function show(text: string) {
  message.value = text;
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 2000);
}

defineExpose({ show });
</script>
