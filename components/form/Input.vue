<template>
  <div class="relative">
    <div class="absolute bottom-4 left-3">
      <slot name="iconLeft"></slot>
    </div>
    <input
      :type="props.type || 'text'"
      class="w-full bg-input-light-blue-2 border-2 border-input-light-blue rounded-[10px] h-[64px] pl-[50px] pr-[55px] placeholder-input-blue"
      :class="{
        'pt-3': props.otp && !value,
        '!pl-0 !pr-0 text-center placeholder:text-[32px] placeholder:font-[Inter] align-middle':
          props.otp,
      }"
      :placeholder="props.placeholder"
      :value="props.value"
      @input="emit('setValue', $event.target.value)"
    >
    <div @click="emit('clickIconRight')" class="absolute bottom-4 right-5 cursor-pointer">
      <slot name="iconRight"></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  value: String,
  placeholder: String,
  type: String,
  otp: Boolean,
})

const emit = defineEmits(['clickIconRight', 'setValue']);
</script>