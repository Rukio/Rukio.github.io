<template>
  <AuthBlock
    description-title="Connect with any device"
    description-label="Everything you need is an internet connection."
  >
    <template #form>
      <LoginForm />
    </template>
    <template #image>
      <LoginImage />
    </template>
  </AuthBlock>
</template>
<script setup lang="ts">
import LoginForm from "../../components/auth/LoginForm.vue";
import LoginImage from "../../components/svg/layout/LoginImage.vue";
</script>