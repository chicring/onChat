
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
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/c/:sessionId',
            name: 'chat',
            props: true,
            component: () => import('@/view/chat/default/Index.vue'),
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('@/view/chat/setting/Setting.vue'),
            meta: {
                keepAlive: false
            }
        }
    ]
}

export default ChatRoutes;