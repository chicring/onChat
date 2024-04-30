

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
    stop?: string;
    max_tokens: number;
    max_history: number;
    tools?: [];
}