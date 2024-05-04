import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {router} from "@/router";

export type User = {
    info: object;
    token: string;
}

const defaultUser: User = {
    info: {
        id: 0,
        username:"Guest",
        email: "",
        role: "Guest",
        currentUsage: 0,
        totalUsage: 0,
        registerDate: "2024-03-13 04:09:41"
    },
    token: ''
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user :Ref<User> = ref(defaultUser)

        function logout(){
            user.value = defaultUser
            localStorage.removeItem('auth')
            router.push('/auth/login')
        }
        return {user, logout}
    },{
        persist: true
    }
)