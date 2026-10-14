<template>
  <div class="min-h-screen bg-white text-black py-10 mt-[64px]">
    <div class="max-w-[680px] mx-auto px-4 mt-[64px]">

      <div v-if="product" class="flex flex-col">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-80 object-contain mb-6 bg-gray-50 rounded-lg"
        />

        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-right text-lg font-bold mb-4">от {{ product.price }} ₽</p>
        <p class="text-sm text-gray-600 leading-relaxed mb-6">
          {{ product.description }}
        </p>

        <div class="flex gap-0 mt-auto">
          <button
            data-test="like-button"
            @click.stop="toggleLike(product)"
            class="w-1/2 border border-black py-2 text-sm font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <img
              v-if="favorites.isLiked(product.id)"
              src="../assets/like2.png"
              alt="like"
              class="w-5 h-5"
            />
            <img v-else src="../assets/like1.png" alt="like" class="w-5 h-5" />
          </button>
          <button
            data-test="add-to-cart"
            @click="addToCard(product)"
            class="w-1/2 bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition"
          >
            add to cart
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-20">Загрузка...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useFavoritesStore } from "../stores/favorites";

const route = useRoute();
const cart = useCartStore();
const favorites = useFavoritesStore();
const toast = inject<(text: string) => void>("toast");
const product = ref<any>(null);

async function fetchProduct() {
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`);
    const data = await res.json();
    product.value = data;
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

function addToCard(product: any) {
  cart.addItem(product);
  toast?.(`Добавлено в корзину. Всего: ${cart.items.length}`);
}

function toggleLike(product: any) {
  const added = favorites.toggleLike(product);
  toast?.(added ? "Добавлено в избранное" : "Удалено из избранного");
}

onMounted(() => {
  fetchProduct();
});
</script>
