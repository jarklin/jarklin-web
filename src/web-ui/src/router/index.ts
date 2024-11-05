import {createRouter, createWebHashHistory} from 'vue-router'
import {SimpleLayout, MainLayout} from "@/layouts";
import HomeView from "@/views/HomeView.vue";
import Page404 from "@/views/404.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: SimpleLayout,
      children: [
        {
          path: 'login',
          name: "login",
          component: () => import("@/views/auth/Login.vue"),
        },
        {
          path: 'logout',
          name: "logout",
          component: () => import("@/views/auth/Logout.vue"),
        },
      ],
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: "home",
          component: HomeView,
        },
        {
          path: 'panel',
          component: () => import("@/views/panel/Layout.vue"),
          children: [
            { path: '', name: "panel", redirect: { name: "settings" }, },
            {
              path: 'settings',
              name: "settings",
              component: () => import("@/views/panel/settings/SettingsView.vue"),
            },
            {
              path: 'problems',
              name: "problems",
              component: () => import("@/views/panel/ProblemsView.vue"),
            },
            {
              path: 'statistics',
              name: "statistics",
              component: () => import("@/views/panel/StatisticsView.vue"),
            },
          ],
        },
        {
          path: 'search',
          name: "search",
          component: () => import("@/views/SearchView.vue"),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: SimpleLayout,
      children: [{ path: '', component: Page404, }],
    }
  ],
})

export default router
