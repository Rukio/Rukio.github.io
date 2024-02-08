<template>
  <div class="mt-3 flex items-center">
    <input
      :checked="props.value"
      class="appearance-none inline-block border-link-blue w-5 h-5 border-[2px] rounded-[3px] checked:bg-checkbox checked:bg-no-repeat checked:bg-center cursor-pointer"
      :class="[
        'appearance-none',
        'inline-block',
        'border-link-blue',
        'w-5',
        'h-5',
        'border-[2px]',
        'rounded-[3px]',
        'checked:bg-checkbox',
        'checked:bg-no-repeat',
        'checked:bg-center',
        'cursor-pointer'
      ]"
      type="checkbox"
      name="accept"
      id="signup-accept"
      @change="emit('setValue', $event.target.checked)"
    >
    <slot name="label"></slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  value: Boolean,
});
const emit = defineEmits(['setValue']);
</script>