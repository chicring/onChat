import axios from 'axios'
import {useAuthStore} from "@/store/auth.ts";
import {toast} from "vuetify-sonner";

const authStore = useAuthStore();

// 创建axios实例
const service = axios.create({
    baseURL: 'http://hk.hjong.cn:8080', // api的base_url
    timeout: 5000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (authStore.user.token.trim()) {
            config.headers['Authorization'] = 'Bearer ' + authStore.user.token // 让每个请求携带token
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            if (res.code === 401) {
                toastError(res.msg)
                authStore.logout()
                return Promise.reject(new Error('error'))
            }
            toastError(res.msg , res.data)
            return Promise.reject(new Error('error'))
        } else {
            return res.data
        }
    },
    error => {
        // console.log('err' + error) // for debug
        if( error.code === 'ECONNABORTED'){
            console.log('请求超时')
        }
        return Promise.reject(error)
    }
)

function toastError(title: string, content?: string){
    toast(title,{
        description: content,
        duration: 3000,
        cardProps: {
            color: 'error',
            rounded: 'md'
        },
        prependIcon: 'mdi-information-outline',
    });
}


export default service
