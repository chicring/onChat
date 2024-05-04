<script setup lang="ts">
import {useSettingStore} from "@/store/setting";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import ConfirmButton from "@/components/ConfirmButton.vue";

const settingStore = useSettingStore();

const {setting} = storeToRefs(settingStore);

const modelText = ref('')
function addModel(){
  if (!modelText.value.trim()) return;
  setting.value.models.push(modelText.value);
  modelText.value = '';
}

function deleteModel(text){
  setting.value.models = setting.value.models.filter((model) => model !== text);
}

const showApiKey = ref(false)
function toggleVisibility(index: number) {
  if (items.value[index].model === 'apiKey') {
    showApiKey.value = !showApiKey.value;
    items.value[index].icon = showApiKey.value ? 'mdi-eye' : 'mdi-eye-off';
    items.value[index].type = showApiKey.value ? 'text' : 'password';
  }
}

const items = ref([
  {
    label: '接口地址',
    subtitle: '需要包含http(s)://',
    placeholder: 'Base API URL',
    model: 'baseApiUrl',
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'text'
  },
  {
    label: 'Api key',
    subtitle: '使用自定义的OpenAI key',
    placeholder: 'API key',
    model: 'apiKey',
    labelCols: '8',
    inputCols: '4',
    icon: 'mdi-eye-off',
    type: 'password'
  },
  // {
  //   label: '自定义模型',
  //   subtitle: '添加可使用的模型, 使用英文, 分割',
  //   placeholder: 'gpt-3',
  //   model: 'models',
  //   labelCols: '8',
  //   inputCols: '4',
  //   icon: '',
  //   type: 'text'
  // }
])

const configItems = ref([
  {
    label: '随机性 Temperature',
    subtitle: '0-1之间的值',
    placeholder: '0.6',
    model: 'temperature',
    min: 0,
    max: 1,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    type: 'slider'
  },
  {
    label: '核采样 top_p',
    subtitle: '0-1之间的值，0.5是一个不错的默认值，部分模型不能设置为1',
    placeholder: '0.5',
    model: 'top_p',
    min: 0,
    max: 1,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '最大回复长度',
    subtitle: '最大回复长度',
    placeholder: '最大回复长度',
    model: 'max_tokens',
    labelCols: '10',
    inputCols: '2',
    icon: '',
    type: 'text'
  },
  {
    label: '话题新鲜度 presence_penalty',
    subtitle: '值越高，模型越倾向于生成新的话题',
    placeholder: '0.6',
    model: 'presence_penalty',
    min: -2,
    max: 2,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '频率惩罚度 frequency_penalty',
    subtitle: '值越高，模型越倾向于避免重复',
    placeholder: '1.0',
    model: 'frequency_penalty',
    min: -2,
    max: 2,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '附带历史信息 max_history',
    subtitle: '附带历史信息数量',
    placeholder: '4',
    min: 1,
    max: 10,
    step: 1,
    model: 'max_history',
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'

  }
])

</script>

<template>
  <v-card class="ma-2" rounded="xl" border="md" flat>

    <v-card-title class="align-self-center">
      <BrandOpenaiIcon></BrandOpenaiIcon> <span>基本设置</span>
    </v-card-title>

    <v-card-text>
      <v-row dense>
        <template v-for="(item, index) in items" :key="index">
          <v-col cols="12" sm="8">
            <v-list-subheader class="text-medium-emphasis">
              <strong>{{ item.label }}</strong>
            </v-list-subheader>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
                :placeholder="item.placeholder"
                v-model="setting[item.model]"
                rounded="lg"
                variant="outlined"
                color="primary" bg-color="containerBg"
                density="comfortable"
                :append-inner-icon="item.icon"
                :type="item.type"
                @click:append-inner="toggleVisibility(index)"
            >
            </v-text-field>
          </v-col>
        </template>
      </v-row>
      <v-row dense justify="space-between">
        <v-col cols="12" sm="8">
          <v-list-subheader class="text-medium-emphasis">
            <strong>可以使用的模型</strong>
          </v-list-subheader>
          <v-list-item-subtitle>可以使用的模型</v-list-item-subtitle>
        </v-col >
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4">
          <v-select
            multiple
            v-model="setting.models"
            variant="outlined"
            chips
            color="primary" bg-color="containerBg"
            readonly
          >

          </v-select>
        </v-col>

      </v-row>
    </v-card-text>
  </v-card>

  <v-card class="mx-2 mt-4" rounded="xl" border="md" flat>

    <v-card-title class="align-self-center">
      <Message2Icon></Message2Icon> 对话设置
    </v-card-title>

    <v-card-text>
      <v-row dense justify="space-between">
        <v-col cols="12" sm="8">
          <v-list-subheader class="text-medium-emphasis">
            <strong>模型(Model)</strong>
          </v-list-subheader>
          <v-list-item-subtitle>选择使用的默认模型</v-list-item-subtitle>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4">
          <v-select variant="outlined" :items="setting.models" density="comfortable" v-model="setting.config.model" color="primary" bg-color="containerBg">

            <template #item="data">
              <v-list-item v-bind="data.props" nav>
                <template #append>
                  <v-btn flat
                         icon="true"
                         size="small"
                         variant="text"
                         @click.stop.prevent="deleteModel(data.props.title)"
                  >
                    <TrashIcon></TrashIcon>
                  </v-btn>
<!--                  <ConfirmButton-->
<!--                      @confirm="deleteModel(data.props.title)"-->
<!--                      flat-->
<!--                      title="删除提示"-->
<!--                      :content="`确定要删除 ${data.props.title} 模型吗？`"-->
<!--                      icon="true"-->
<!--                      size="small"-->
<!--                      variant="text"-->
<!--                  >-->
<!--                  </ConfirmButton>-->
                </template>
              </v-list-item>
            </template>

            <template #append-item>
              <v-text-field
                class="pa-2"
                variant="outlined"
                label="添加模型"
                color="primary"
                hide-details
                bg-color="containerBg"
                v-model="modelText"
              >

                <template #append>
                  <v-btn color="primary" icon="true" variant="text" @click="addModel">
                    <TablePlusIcon></TablePlusIcon>
                  </v-btn>
                </template>
              </v-text-field>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row dense>
        <template v-for="(item, index) in configItems" :key="index">
          <v-col cols="12" sm="8">
            <v-list-subheader class="text-medium-emphasis">
              <strong>{{ item.label }}</strong>
            </v-list-subheader>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
                v-if="item.type === 'text'"
                :placeholder="item.placeholder"
                v-model="setting.config[item.model]"
                rounded="lg"
                variant="outlined"
                density="comfortable"
                type="number"
                color="primary" bg-color="containerBg"
                :append-inner-icon="item.icon"
                :type="item.type"
                @click:append-inner="toggleVisibility(index)"
            >
            </v-text-field>
            <v-slider
                v-else
                v-model="setting.config[item.model]"
                :max="item.max"
                :min="item.min"
                :step="item.step"
                thumb-label
                color="primary"
                hide-details
            >
              <template v-slot:append>
                <v-text-field
                    v-model="setting.config[item.model]"
                    density="compact"
                    style="width: 70px"
                    hide-details
                    single-line
                    rounded="lg"
                    variant="outlined"
                    readonly
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>

        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>