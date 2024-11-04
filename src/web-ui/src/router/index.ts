import {createRouter, createWebHashHistory} from 'vue-router'
import {LoginLayout, MainLayout} from "@/layouts";
import HomeView from "@/views/HomeView.vue";
import Page404 from "@/views/404.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: LoginLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: import("@/views/auth/Login.vue"),
        },
        {
          path: "logout",
          name: "logout",
          component: import("@/views/auth/Logout.vue"),
        },
      ],
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "panel",
          name: "panel",
          component: import("@/views/404.vue"),
        },
        {
          path: "search",
          name: "search",
          component: import("@/views/404.vue"),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', component: Page404, }
  ],
})

export default router
