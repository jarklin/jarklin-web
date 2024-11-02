import {createRouter, createWebHashHistory} from 'vue-router'
import {LoginLayout, MainLayout} from "@/layouts";

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
          component: () => import("@/views/auth/Login.vue")
        },
        {
          path: "logout",
          name: "logout",
          component: () => import("@/views/auth/Logout.vue")
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
          component: () => import("@/views/HomeView.vue")
        }
      ]
    },
  ]
})

export default router
