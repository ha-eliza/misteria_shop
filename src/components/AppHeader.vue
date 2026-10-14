<template>
  <header class="fixed top-0 left-0 w-full bg-black text-white z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
      <router-link to="/" class="insrumentalSerif text-3xl">
        MISTERIA
      </router-link>

      <div class="flex items-center gap-6">
        <router-link to="/" class="iosevkaCharon"> Shop </router-link>

        <div class="relative hidden md:block">
          <input
            data-test="search-input"
            v-model="searchQuery"
            @input="showResults = true"
            @focus="showResults = true"
            type="text"
            placeholder="Search for products..."
            class="bg-[#f0f0f0] iosevkaCharon text-black text-xs rounded-full px-4 py-1.5 pl-10 w-64 focus:outline-none"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <img src="../assets/search.png" alt="" />
          </span>

          <div
            v-if="showResults && filteredProducts.length"
            data-test="search-results"
            class="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg mt-2 z-50"
          >
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              @click="goToProduct(product.id)"
              class="flex items-center gap-3 p-2 hover:bg-gray-100 hover:rounded-full cursor-pointer"
            >
              <img :src="product.thumbnail" class="w-8 h-8 object-contain" />
              <span class="text-sm text-black">{{ product.title }}</span>
            </div>
          </div>
        </div>

        <router-link
          :to="auth.isLoggedIn ? '/profile' : '/auth'"
          class="text-xl hover:text-gray-300 transition"
        >
          <img src="../assets/person.png" alt="person" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const showResults = ref(false);
const router = useRouter();

const allProducts = ref<any[]>([]);

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return [];
  return allProducts.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5);
});

function goToProduct(id: number) {
  router.push(`/product/${id}`);
  searchQuery.value = '';
  showResults.value = false;
}
import { onMounted } from 'vue';

onMounted(async () => {
  const urls = [
    "https://dummyjson.com/products/category/tops",
    "https://dummyjson.com/products/category/mens-shirts",
    "https://dummyjson.com/products/category/womens-dresses",
  ];
  const responses = await Promise.all(
    urls.map((url) => fetch(url).then((r) => r.json()))
  );
  allProducts.value = responses.flatMap((r) => r.products);
});
</script>
