<script setup lang="ts">
const props = defineProps<{
  item: Object
}>()
</script>

<template>
  <component :is="props.item" size="20" stroke-width="1.5" class="iconClass"></component>
</template>

<style scoped>

</style>