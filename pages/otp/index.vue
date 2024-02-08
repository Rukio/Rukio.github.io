<template>
  <AuthBlock
    description-title="It's just OTP verification"
    description-label="You are one step away from recovering your password."
  >
    <template #form>
      <OtpForm />
    </template>
    <template #image>
      <OtpImage />
    </template>
  </AuthBlock>
</template>
<script setup lang="ts">
import OtpForm from "../../components/auth/OtpForm.vue";
import OtpImage from "../../components/svg/layout/OtpImage.vue";
import AuthBlock from "../../components/auth/AuthBlock.vue";
</script>