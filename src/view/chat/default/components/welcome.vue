<script setup lang="ts">

import {useSettingStore} from "@/store/setting.ts";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";

const settingStore = useSettingStore();

const {setting} = storeToRefs(settingStore);

// 窗口
const step = ref(1);

onMounted(() => {
  if(!setting.value.apiKey || !setting.value.baseApiUrl){
    step.value = 1;
  }else {
    step.value = 2;
  }
})
</script>

<template>
  <div>
    <v-window
        v-model="step"
    >
      <v-window-item :value="1">

        <v-row justify="center">

          <v-col cols="12" md="7">

            <v-stepper :items="['填写配置', '开始对话']" rounded="md" flat>
              <template v-slot:item.1>
                <v-card flat>
                  <v-card-title>
                    <h3>OpenAI 接口配置</h3>
                  </v-card-title>
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col cols="12" md="8">
                        <v-list-subheader class="text-medium-emphasis">
                          <strong>接口地址</strong>
                        </v-list-subheader>
                        <v-list-item-subtitle>需要包含http(s)://</v-list-item-subtitle>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field
                            placeholder="需要包含http(s)://"
                            v-model="setting.baseApiUrl"
                            rounded="lg"
                            variant="outlined"
                            color="primary" bg-color="containerBg"
                            density="comfortable"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" md="8">
                        <v-list-subheader class="text-medium-emphasis">
                          <strong>Api key</strong>
                        </v-list-subheader>
                        <v-list-item-subtitle>使用自定义的OpenAI key</v-list-item-subtitle>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field
                            placeholder="OpenAI Api Key"
                            v-model="setting.apiKey"
                            rounded="lg"
                            variant="outlined"
                            color="primary" bg-color="containerBg"
                            density="comfortable"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </template>

              <template v-slot:item.2>
                <v-card flat>
                  <v-card-title><h3>开始对话</h3></v-card-title>
                </v-card>
              </template>
            </v-stepper>
          </v-col>

        </v-row>

      </v-window-item>

      <v-window-item :value="2">

        <v-row>
          <v-col cols="12" md="4" >
            <v-card flat>
              <v-card-title>
                <div>
                  <SearchIcon></SearchIcon>
                  <span>支持开启模型联网搜索</span>
                </div>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>

      </v-window-item>

    </v-window>
  </div>
</template>

<style scoped>

</style>