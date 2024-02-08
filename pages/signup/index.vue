<template>
  <AuthBlock
    description-title="Join us!"
    description-label="Just go through the boring process of creating an account."
  >
    <template #form>
      <SignUpForm />
    </template>
    <template #image>
      <SignUpImage class="pl-6" />
    </template>
  </AuthBlock>
</template>
<script setup lang="ts">
import SignUpForm from "../../components/auth/SignUpForm.vue";
import SignUpImage from "../../components/svg/layout/SignUpImage.vue";
</script>