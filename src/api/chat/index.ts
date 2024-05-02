
import axios from "axios";
import {OpenAiRequestBody, OpenAiResponseBody} from "./types";
import {useSettingStore} from "@/store/setting.ts";
import {storeToRefs} from "pinia";

export type DataCallback = (data: string) => void;
export type ErrorCallback = (error: Error) => void;
export type ResponseCallback = (response: string) => void;

const settingStore = useSettingStore();
const {setting} = storeToRefs(settingStore);
class GptClient{
    private static instance: GptClient;

    public static getInstance(): GptClient {
        if (!GptClient.instance) {
            GptClient.instance = new GptClient();
        }
        return GptClient.instance;
    }

    async post(
        data: OpenAiRequestBody,
        onData: DataCallback,
        onResponse: ResponseCallback,
        onError: ErrorCallback
    ){

        const decoder = new TextDecoder("utf-8");

        const url = setting.value.baseApiUrl + "/v1/chat/completions";

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + setting.value.apiKey
        };


        if (data.stream){
            let finalResult = "";

            try {
                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                }).then(response => {
                    if (response.ok){
                        const reader = response.body!.getReader();
                        pump(reader)
                    }
                })

                function pump(reader: any) {
                    reader.read().then(({ value, done }: { value: Uint8Array; done: boolean }) => {
                        if (done) {
                            return;
                        }
                        const text = decoder.decode(value);
                        const lines = text.split("\n");
                        for (const line of lines) {
                            if (line.length > 0) {
                                const json = line.substring(5).trim();
                                if (json === "[DONE]") {
                                    onResponse(finalResult);
                                    break;
                                }
                                try{
                                    const result: OpenAiResponseBody = JSON.parse(json);
                                    finalResult += result.choices[0]?.delta.content || "";
                                    onData(finalResult);
                                }catch (err){
                                    console.log(line);
                                    onError(new Error(line));
                                }

                            }
                        }
                        pump(reader);
                    });
                }

            }catch (err: any) {
                console.log(err.message)

                onError(new Error(err));
            }

        }else {
            try {
                const response = await axios.post(url, data, {
                    headers,
                });
                const result: OpenAiResponseBody = response.data;
                onResponse(result.choices[0].message?.content!);
            } catch (err: any) {
                onError(new Error(err));
            }
        }
    }
}

export default GptClient;
