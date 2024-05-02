import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import './scss/style.scss'
import {createPinia} from "pinia";
import VueTablerIcons from 'vue-tabler-icons'
import VueApexCharts from "vue3-apexcharts";
import {vuetify} from "./plugins/vuetify.ts";
import VuetifyUseDialog from 'vuetify-use-dialog'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);
app.use(router);
app.use(PerfectScrollbarPlugin);
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(VueTablerIcons)
app.use(VueApexCharts)

app.use(vuetify)
app.use(VuetifyUseDialog).mount('#app')
