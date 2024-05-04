import {defineStore} from "pinia";
import {ref} from "vue";

export type ConfigProps = {
    Sidebar_drawer: boolean;
    Customizer_drawer: boolean;
    mini_sidebar: boolean;
    Theme: string;
    inputBg: boolean;
};

const config: ConfigProps = {
    Sidebar_drawer: true,
    Customizer_drawer: false,
    mini_sidebar: false,
    Theme: 'PurpleTheme',
    inputBg: false
};

export default config;


export const useCustomizerStore = defineStore(
    'customizer',
    () => {
        const Sidebar_drawer = ref(config.Sidebar_drawer);
        const Customizer_drawer = ref(config.Customizer_drawer);
        const mini_sidebar = ref(config.mini_sidebar);
        const Theme = ref(config.Theme);
        const ADMIN_mini_sidebar = ref(false);
        const ADMIN_Sidebar_drawer = ref(true);

        function SET_SIDEBAR_DRAWER() {
            Sidebar_drawer.value = !Sidebar_drawer.value;
        }

        function SET_MINI_SIDEBAR(payload: boolean) {
            mini_sidebar.value = payload;
        }

        function SET_CUSTOMIZER_DRAWER(payload: boolean) {
            Customizer_drawer.value = payload;
        }

        function SET_THEME(payload: string) {
            Theme.value = payload;
        }

        function SET_ADMIN_MINI_SIDEBAR(payload: boolean) {
            ADMIN_mini_sidebar.value = payload;
        }
        return {Sidebar_drawer, Customizer_drawer, mini_sidebar, Theme,ADMIN_mini_sidebar, ADMIN_Sidebar_drawer,
            SET_SIDEBAR_DRAWER, SET_MINI_SIDEBAR, SET_CUSTOMIZER_DRAWER, SET_THEME,
        }
    }
)