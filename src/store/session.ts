import {Config, useSettingStore} from "@/store/setting.ts";
import {defineStore, storeToRefs} from "pinia";
import {ref, Ref} from "vue";
import {localStorageKey} from "@/store/constant.ts";
import { OpenAiRequestBody, ReqMessage} from "../api/chat/types";

import GptClient from "../api/chat";
import {getUuid} from "@/util/uuid.ts";

const settingStore = useSettingStore();
const {setting} = storeToRefs(settingStore);

export interface Session {
    id: string;
    topic: string;
    messages: Message[];
    lastUpdate: number;
    config: Config
}

export interface Message {
    id?: string;
    date?: number;
    role?: string;
    content?: string;
    token?: string;
}

export const useSessionStore  = defineStore(
    'session',
    () => {
        const sessions : Ref<Session[]> = ref([])

        const lastRely = ref(null as Message | null);
        const isRelying = ref(false);
        const currentTopic = ref('')

        async function createSession(): Promise<string>{

            if(!setting.value.baseApiUrl.trim() || !setting.value.baseApiUrl.trim()) {
                throw new Error('请先配置API地址和Token')
            }

            const newMessage: Message = {
                date: Math.floor(Date.now() / 1000),
                role: "system",
                content: "有什么可以帮你的吗",
            }
            const newSession: Session = {
                id: getUuid(),
                topic: "随便聊聊",
                messages: [newMessage],
                lastUpdate: Math.floor(Date.now() / 1000),
                config: setting.value.config
            };
            sessions.value.push(newSession);
            return newSession.id;
        }

        async function addSession(session: Session) {
            sessions.value.push(session)
        }

        async function deleteSessionById(id: string) {
            sessions.value = sessions.value.filter(session => session.id !== id);
        }

        async function deleteAllSessions() {
            sessions.value = []
        }

        async function findSessionById(id: string)  {
            return sessions.value.find(s => s.id === id)
        }

        async function doChat(sessionId: string, messagelist: Message[], config: Config) {
            isRelying.value = true;
            const requestBody: OpenAiRequestBody = {
                messages: (() =>{
                    if (messagelist.length > config.max_history) {
                        let slicedMessages = messagelist.slice(messagelist.length - config.max_history);
                        if (slicedMessages[0].role === 'assistant') {
                            let previousMessage = messagelist[messagelist.length - config.max_history - 1];

                            slicedMessages.unshift({
                                role: previousMessage.role,
                                content: previousMessage.content,
                            } as ReqMessage);
                        }
                        return slicedMessages.map((message) => {
                            return {
                                role: message.role,
                                content: message.content,
                            } as ReqMessage;
                        });
                    } else {
                        return messagelist.map((message) => {
                            return {
                                role: message.role,
                                content: message.content,
                            } as ReqMessage;
                        })
                    }
                })(),

                model: config.model,
                max_tokens: config.max_tokens,
                temperature: config.temperature,
                top_p: config.top_p,
                frequency_penalty: config.frequency_penalty,
                presence_penalty: config.presence_penalty,
                stream: config.stream,
            };

            await GptClient.getInstance().post(
                requestBody,
                (data) => {
                    lastRely.value = {
                        date: Math.floor(Date.now() / 1000),
                        role: "assistant",
                        content: data,
                        id: getUuid(),
                    } as Message;
                },
                (data) => {
                    sessions.value.find(s => s.id === sessionId)?.messages.push(lastRely.value)
                    lastRely.value = null
                    isRelying.value = false
                },
                (error : any) => {
                    const errorMessage: Message = {
                        date: Math.floor(Date.now() / 1000),
                        role: "assistant",
                        content: error.message,
                    }
                    sessions.value.find(s => s.id === sessionId)?.messages.push(errorMessage)
                    lastRely.value = null;
                    isRelying.value = false;
                }

            )
        }

        return { sessions, lastRely, isRelying, currentTopic,createSession, addSession, deleteSessionById, deleteAllSessions, findSessionById, doChat }
    },
    {
        persist: {
            key: localStorageKey.Sessions,
            paths: ['sessions']
        }
    }
)