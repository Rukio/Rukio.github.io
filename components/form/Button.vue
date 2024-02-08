<template>
  <button
    @click="(e) => emit('onClick', e)"
    class="bg-link-blue w-full rounded-[10px] border-0 text-center text-xl py-[18px] text-white font-['Inter'] font-bold disabled:opacity-40"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  disabled: Boolean,
});
const emit = defineEmits(['onClick']);
</script>