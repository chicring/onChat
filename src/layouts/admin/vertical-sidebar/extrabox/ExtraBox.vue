<script setup lang="ts">

</script>

<template>
  <div class="bg-lightwarning rounded-md px-5 pt-5  my-2 circle_brand sm-circle lg-circle"
  >
<!--    <h4>Github</h4>-->
<!--    <h6 class="text-subtitle-2 text-medium-emphasis pr-11 mb-3 mt-2">-->

<!--    </h6>-->

    <div class="d-flex">
      <v-btn  icon="true" variant="text"
              href="https://github.com/chicring/OpenAI-Proxy-OnChat"
      >
        <BrandGithubIcon></BrandGithubIcon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.circle_brand {
  position: relative;
  overflow: hidden;
  &.sm-circle {
    &::before {
      content: '';
      position: absolute;
      width: 200px;
      height: 200px;
      border: 3px solid rgb(var(--v-theme-warning));
      border-radius: 50%;
      top: 45px;
      right: -70px;
    }
  }

  &.lg-circle {
    &::after {
      content: '';
      position: absolute;
      width: 200px;
      height: 200px;
      border: 19px solid rgb(var(--v-theme-warning));
      border-radius: 50%;
      top: 10px;
      right: -120px;
    }
  }
}
</style>