
const ChatRoutes = {
    path: '/',
    meta: {
        requiresAuth: false
    },
    redirect: '/default',
    component: () => import('@/layouts/chat/ChatLayout.vue'),
    children: [
        {
            path: '/default',
            name: 'default',
            component: () => import('@/view/chat/default/Index.vue'),
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('@/view/chat/setting/Setting.vue'),
        }
    ]
}

export default ChatRoutes;