<template>
  <HeroBanner />
  <section
    class="min-h-screen bg-white text-black py-10"
    style="max-width: 1280px; margin: 0 auto"
  >
    <div

    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        data-test="product-card"
        v-for="product in products"
        :key="product.id"
        class="bg-white text-gray-900 p-4 flex flex-col"
      >
        <router-link :to="`/product/${product.id}`" class="flex flex-col">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="h-40 object-contain mb-4"
          />
          <h3 class="text-right font-bold text-[21px] mb-1">
            {{ product.title }}
          </h3>
          <p class="text-right text-lg mb-3">от {{ product.price }} ₽</p>
        </router-link>

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
            @click.stop="addToCard(product)"
            class="w-1/2 bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition"
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
import { useCartStore } from "../stores/cart";
import HeroBanner from "../components/HeroBanner.vue";
import { useFavoritesStore } from "../stores/favorites";
import type { Product, ProductsResponse } from "../types/index";

const products = ref<Product[]>([]);
const cart = useCartStore();
const favorites = useFavoritesStore();
const toast = inject<(text: string) => void>("toast");

async function fetchProducts() {
  try {
    const urls = [
      "https://dummyjson.com/products/category/tops",
      "https://dummyjson.com/products/category/mens-shirts",
      "https://dummyjson.com/products/category/womens-dresses",
    ];
    const responses: ProductsResponse[] = await Promise.all(
      urls.map((url) => fetch(url).then((r) => r.json())),
    );
    products.value = responses.flatMap((r) => r.products);
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

function addToCard(product: Product) {
  cart.addItem(product);
  toast?.(`Добавлено в корзину. Всего: ${cart.items.length}`);
}

function toggleLike(product: Product) {
  const added = favorites.toggleLike(product);
  toast?.(added ? "Добавлено в избранное" : "Удалено из избранного");
}

onMounted(() => {
  fetchProducts();
});
</script>
