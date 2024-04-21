/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:"/",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () => import("@/pages/index.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
