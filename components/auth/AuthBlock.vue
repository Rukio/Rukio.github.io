<template>
  <div class="xl:h-screen xl:overflow-hidden">
    <Wrapper>
      <div class="flex min-h-[100vh] h-full justify-center items-stretch flex-col xl:flex-row">
        <div class="flex flex-1 items-center justify-center">
          <slot name="form"></slot>
        </div>
        <div :class="[
          'pb-2',
          'xl:pb-0',
          'pt-9',
          'xl:pt-0',
          'flex',
          'flex-1',
          'items-center',
          'flex-col',
          'justify-center',
          'bg-layout-blue',
          'relative',
          'after:absolute',
          'after:bg-layout-blue',
          'xl:after:w-[55vw]',
          'xl:after:h-[100vh]',
          'xl:after:top-0',
          'xl:after:left-[99%]',
          'after:display-none',
          'xl:after:display-block',
        ]">
          <slot name="image"></slot>
          <div class="mt-10">
            <h2 class="text-center font-bold text-string-white text-xl">{{ props.descriptionTitle }}</h2>
            <p class="text-center font-medium text-string-white">{{ props.descriptionLabel }}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
</template>
<script setup lang="ts">
import Wrapper from "../common/Wrapper.vue";

const props = defineProps({
  descriptionTitle: String,
  descriptionLabel: String,
})
</script>