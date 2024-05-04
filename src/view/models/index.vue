<script setup lang="ts">



import {onMounted, ref} from "vue";
import {findAllModel} from "@/api/methods/channel.ts";

const list = ref([])

onMounted(async () => {
  list.value = await findAllModel()
})
</script>

<template>
  <v-card flat>
    <v-card-title>模型列表</v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4" v-for="(item, index) in list">
          <v-card height="130" elevation="0" color="gray100"  hover>
            <v-card-title><span class="text-body-1 font-weight-bold">{{item.requestModel}}</span></v-card-title>
            <v-card-subtitle>
              {{item.description}}
            </v-card-subtitle>
            <v-card-actions class="justify-end">
              <v-btn rounded="md" icon variant="text" color="primary">
                <EditCircleIcon ></EditCircleIcon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
</style>