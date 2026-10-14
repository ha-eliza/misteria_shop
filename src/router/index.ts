import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import AuthView from "../views/AuthView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/product/:id', name: 'productId', component: ProductView },
  { path: '/auth', name: 'auth', component: AuthView },
  { path: '/profile', name: 'profile', component: ProfileView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
