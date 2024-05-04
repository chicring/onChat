

const AdminRoutes = {
    path: '/admin',
    meta: {
        requiresAuth: true
    },
    redirect: '/admin/dashboard',
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    children: [
        {
            name: 'dashboard',
            path: 'dashboard',
            component: () => import('@/view/dashboards/DefaultDashboard.vue'),
        },
        {
            name: 'apikeys',
            path: 'apikeys',
            component: () => import('@/view/apikeys/index.vue'),
        },
        {
            name: 'users',
            path: '/admin/users',
            component: () => import('@/view/users/index.vue'),
        },
        {
            name: 'logs',
            path: '/admin/logs',
            component: () => import('@/view/logs/index.vue'),
        },
        {
            name: 'settings',
            path: '/admin/settings',
            component: () => import('@/view/settings/index.vue'),
        }
    ]
}


export default AdminRoutes;