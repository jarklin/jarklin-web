import {createRouter, createWebHashHistory} from 'vue-router'
import {SimpleLayout} from "@/layouts";
import HomeView from "@/views/home/index.vue";
import MediaListView from "@/views/media/list/index.vue";
import MediaDetailsView from "@/views/media/details/index.vue";
import CollectionDetailsView from "@/views/media/collection/index.vue";
import PanelLayout from "@/views/panel/Layout.vue";
import PanelSettingsView from "@/views/panel/settings/index.vue";
import Page404 from "@/views/404.vue";


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
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
      children: [
        {
          path: '',
          name: "home",
          component: HomeView,
        },
        {
          path: 'tags',
          name: "tags",
          component: () => import("@/views/tags/index.vue"),
        },
        {
          path: 'panel',
          component: PanelLayout,
          children: [
            { path: '', name: "panel", redirect: { name: "settings" }, },
            {
              path: 'settings',
              name: "settings",
              component: PanelSettingsView,
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
              component: MediaListView,
            },
            {
              path: 'details/:mediaPath(.*)*',
              name: "media-details",
              component: MediaDetailsView,
            },
            {
              path: 'collections',
              name: "collections",
              component: () => import("@/views/media/collections/index.vue"),
            },
            {
              path: 'collection/:mediaPath(.*)*',
              name: "collection-details",
              component: CollectionDetailsView,
            },
            {
              path: 'search',
              name: "search",
              component: () => import("@/views/media/search/index.vue"),
            },
            {
              path: 'explorer/:mediaPath(.*)*',
              name: "explorer",
              component: () => import("@/views/media/explorer/index.vue"),
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
