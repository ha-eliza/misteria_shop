<template>
  <div class="relative hero-banner pt-24 pb-16 mt-[64px]">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 mb-10 md:mb-0">
        <h1
          class="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6"
        >
          FIND CLOTHES<br />
          THAT MATCHES<br />
          YOUR STYLE
        </h1>

        <p class="text-gray-600 text-sm mb-8 max-w-md">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>

        <button
          class="bg-black text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition"
        >
          Shop Now
        </button>

        <div class="flex gap-10 mt-10">
          <div>
            <p class="text-3xl font-bold text-black">200+</p>
            <p class="text-xs text-gray-500">International Brands</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-black">2,000+</p>
            <p class="text-xs text-gray-500">High-Quality Products</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-black">30,000+</p>
            <p class="text-xs text-gray-500">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="bg-black text-white py-6 owerflow-hidden">
    <Swiper
      :modules="[Autoplay]"
      :slides-per-view="2"
      :space-between="20"
      :autoplay="{ delay: 2000 }"
      :loop="true"
      :breakpoints="{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 }
      }"
      class="max-w-7xl mx-auto px-6"
    >
      <SwiperSlide v-for="(icon, i) in icons" :key="i">
        <img :src="icon" alt="" class="mx-auto h-8 object-contain" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.hero-banner {
  background-image: url("../assets/banner.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

<script setup lang="ts">
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';

const icons = [icon1, icon2, icon3, icon4, icon5];
</script>
