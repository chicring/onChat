import {Config} from "@/store/setting.ts";


export interface Session {
    id: string;
    topic: string;
    messages: Message[];
    lastUpdate: number;
    config: Config
}

export interface Message {
    id?: string;
    date: number;
    role?: string;
    content?: string;
    token?: string;
}