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
          path: 'search',
          name: "search",
          component: () => import("@/views/SearchView.vue"),
        },
        {
          path: 'tags',
          name: "tags",
          component: Page404,
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
              component: () => import("@/views/panel/problems/ProblemsView.vue"),
            },
            {
              path: 'statistics',
              name: "statistics",
              component: () => import("@/views/panel/statistics/StatisticsView.vue"),
            },
          ],
        },
        {
          path: 'media',
          children: [
            {
              path: 'list',
              name: "media-list",
              component: Page404,
            },
            {
              path: 'details/:mediaPath(.*)*',
              name: "media-details",
              component: Page404,
            },
            {
              path: 'collections',
              name: "collections",
              component: Page404,
            },
            {
              path: 'collection/:mediaPath(.*)*',
              name: "collection-details",
              component: Page404,
            },
            {
              path: 'consume',
              children: [
                {
                  path: 'manga/:mediaPath(.*)*',
                  name: "consume-manga",
                  component: Page404,
                },
                {
                  path: 'slideshow/:mediaPath(.*)*',
                  name: "consume-slideshow",
                  component: Page404,
                },
                {
                  path: 'watch/:mediaPath(.*)*',
                  name: "consume-watch",
                  component: Page404,
                },
              ],
            },
          ],
        },
        {
          path: 'explorer/:mediaPath(.*)*',
          name: "explorer",
          component: Page404,
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
