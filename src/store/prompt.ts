import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {localStorageKey} from "@/store/constant.ts";

export type Prompt = {
    id?: number;
    title: string;
    content: string;
    contentLength?: number;
}

const defaultPrompt: Prompt = {
    id: 0,
    title: '充当一个助手',
    content: '我想让你充当一个助手，帮我处理一些事情',
    contentLength: 20
}

export const usePromptStore = defineStore(
    "prompt",
    () => {
        const prompts : Ref<Array<Prompt>> = ref([])
        prompts.value.push(defaultPrompt)

        function addPrompt(prompt: Prompt){
            prompt.id = new Date().getTime()
            prompt.contentLength = prompt.content.length
            prompts.value.push(prompt)
        }

        function removePrompt(id: number){
            prompts.value = prompts.value.filter(item => item.id !== id)
        }

        return {prompts, addPrompt , removePrompt}
    },
    {
        persist: {
            key: localStorageKey.Prompt,
        }
    }
)