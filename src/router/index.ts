import ChatRoutes  from './ChatRoutes';
import AdminRoutes from './AdminRoutes';
import { createRouter, createWebHistory } from 'vue-router';
import AuthRoutes from "@/router/AuthRoutes.ts";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/view/error/404.vue')
        },
        AuthRoutes,
        ChatRoutes,
        AdminRoutes
    ]
})

