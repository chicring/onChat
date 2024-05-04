<script setup lang="ts">
import Icon from '../IconSet.vue';

const props = defineProps({ item: Object});
</script>

<template>
  <v-list-item
      :to="item.to"
      rounded
      class="mb-1"
      color="secondary"
      exact
  >
    <template #prepend>
      <Icon :item="props.item.icon"></Icon>
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
  </v-list-item>
</template>

<style scoped>

</style>