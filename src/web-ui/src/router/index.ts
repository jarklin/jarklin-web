import {createRouter, createWebHashHistory} from 'vue-router'
import {SimpleLayout, MainLayout} from "@/layouts";
import HomeView from "@/views/home/index.vue";
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
          component: () => import("@/views/auth/login/index.vue"),
        },
        {
          path: 'logout',
          name: "logout",
          component: () => import("@/views/auth/logout/index.vue"),
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
          component: () => import("@/views/search/index.vue"),
        },
        {
          path: 'tags',
          name: "tags",
          component: () => import("@/views/tags/index.vue"),
        },
        {
          path: 'panel',
          component: () => import("@/views/panel/Layout.vue"),
          children: [
            { path: '', name: "panel", redirect: { name: "settings" }, },
            {
              path: 'settings',
              name: "settings",
              component: () => import("@/views/panel/settings/index.vue"),
            },
            {
              path: 'problems',
              name: "problems",
              component: () => import("@/views/panel/problems/index.vue"),
            },
            {
              path: 'statistics',
              name: "statistics",
              component: () => import("@/views/panel/statistics/index.vue"),
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
                  component: () => import("@/views/media/consume/manga/index.vue"),
                },
                {
                  path: 'slideshow/:mediaPath(.*)*',
                  name: "consume-slideshow",
                  component: Page404,
                },
                {
                  path: 'watch/:mediaPath(.*)*',
                  name: "consume-watch",
                  component: () => import("@/views/media/consume/watch/index.vue"),
                },
              ],
            },
          ],
        },
        {
          path: 'explorer/:mediaPath(.*)*',
          name: "explorer",
          component: () => import("@/views/explorer/index.vue"),
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
