<script setup lang="ts">

import { useConfirm } from 'vuetify-use-dialog'

interface Props {
  title?: string;
  content?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '提示',
  content: '确定要执行此次操作吗？',
});

const { title, content, ...otherAttrs } = props

const createConfirm = useConfirm()

const emit = defineEmits(['confirm', 'close']);

async function handleConfirm() {
  const isConfirmed = await createConfirm(
      {
        title: title,
        content: content,
        confirmationText: '确定',
        cancellationText: '取消',
        dialogProps: {
          maxWidth: 350,
        },
        cardProps: {
          rounded: 'md',
          elevation: 0,
        },
      }
  )

  if (!isConfirmed)
    return

  emit('confirm');
}

</script>

<template>
  <v-btn
      v-bind="otherAttrs"
      @click="handleConfirm"
  >
    <template #append>
      <slot name="append"></slot>
    </template>

    <template #prepend>
      <slot name="prepend"></slot>
    </template>

    <template #default>
      <slot></slot>
    </template>

    <template #loader>
      <slot name="loader"></slot>
    </template>
  </v-btn>
</template>

<style scoped>

</style>