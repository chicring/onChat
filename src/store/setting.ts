import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {localStorageKey} from "@/store/constant.ts";


export interface Setting {
    baseApiUrl: string;
    apiKey: string;
    models: string[];
    config: Config;
}

export interface Config {
    stream: boolean;
    model: string;
    temperature: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    top_p: number;
    top_k?: number;
    stop?: string | null;
    max_tokens: number;
    max_history: number;
    tools?: [];
}

export const useSettingStore = defineStore(
    'setting',
    () =>{
        const setting : Ref<Setting> = ref(
            {
                baseApiUrl: '',
                apiKey: '',
                models: ['gpt-3.5-turbo','gpt-4'],
                config: {
                    stream: true,
                    model: "glm-4",
                    temperature: 0.7,
                    top_p: 0.8,
                    stop: null,
                    max_tokens: 2000,
                    max_history: 4
                } as Config
            } as Setting
        )

        async function updateSetting(newSetting : Setting) {
            setting.value = newSetting;
        }

        return {setting, updateSetting}
    },
    {
        persist: {
            key: localStorageKey.Setting,
        }
    }
)