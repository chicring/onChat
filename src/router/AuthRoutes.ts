
const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/view/auth/Login.vue')
        },
        {
            name: 'Register',
            path: '/auth/register',
            component: () => import('@/view/auth/Register.vue')
        },
        {
            name: 'reset',
            path: '/auth/reset',
            component: () => import('@/view/auth/Reset.vue')
        }
    ]
};

export default AuthRoutes;