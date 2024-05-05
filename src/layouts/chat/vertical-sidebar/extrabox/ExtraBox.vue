<script setup lang="ts">

</script>

<template>
  <div class="bg-lightwarning rounded-md px-5 pt-5  my-2 circle sm-circle lg-circle">
    <h4>欢迎回来!</h4>
    <h6 class="text-subtitle-2 text-medium-emphasis pr-11 mb-3 mt-2">

    </h6>

    <div class="d-flex ga-2">
      <v-btn color="warning" icon="true" variant="text" to="/setting">
        <Settings2Icon></Settings2Icon>
      </v-btn>

      <v-btn color="warning" icon="true" variant="text" to="/prompt">
        <PromptIcon></PromptIcon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>