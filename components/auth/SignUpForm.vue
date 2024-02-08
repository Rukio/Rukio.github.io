<template>
  <div>
    <div class="flex w-full w-[485px] min-h-full flex-1 flex-col justify-center px-4 py-12">
      <h2 class="mb-1 text-left leading-10 text-form-title font-bold tracking-normal text-gray-900">Create your account</h2>
      <p class="text-xl text-string-grey">Unlock all features!</p>

      <form class="mt-6" @submit.prevent="handleSignIn" novalidate>
        <div>
          <Input
            :value="store.name"
            placeholder="Username"
            @setValue="handleSetName($event)"
          >
            <template #iconLeft>
              <PersonIcon />
            </template>
          </Input>
        </div>
        <div class="mt-2.5">
          <Input
            :value="store.email"
            placeholder="Email"
            type="email"
            @setValue="handleSetEmail($event)"
          >
            <template #iconLeft>
              <EnvelopeIcon />
            </template>
          </Input>
        </div>
        <div class="mt-2.5">
          <Input
            :value="store.password"
            placeholder="Password"
            :type="passwordInputType"
            @clickIconRight="() => {passwordVisible = !passwordVisible}"
            @setValue="handleSetPassword($event)"
          >
            <template #iconLeft>
              <ShieldIcon />
            </template>
            <template #iconRight>
              <EyeLashOpenIcon v-if="passwordVisible" />
              <EyeLashIcon v-else />
            </template>
          </Input>
        </div>
        <div class="mt-2.5">
          <Input
            :value="store.passwordConfirm"
            placeholder="Confirm Password"
            :type="passwordConfirmInputType"
            @clickIconRight="() => {passwordConfirmVisible = !passwordConfirmVisible}"
            @setValue="handleSetPasswordConfirm($event)"
          >
            <template #iconLeft>
              <ShieldIcon />
            </template>
            <template #iconRight>
              <EyeLashOpenIcon v-if="passwordConfirmVisible" />
              <EyeLashIcon v-else />
            </template>
          </Input>
        </div>
        <Checkbox
          :value="store.isTermsAccepted"
          @setValue="handleSetIsTermsAccepted($event)"
        >
          <template #label>
            <span class="text-string-grey ml-2">
              Accept
              <a href="#" class="text-link-blue font-medium">terms and conditions</a>
            </span>
          </template>
        </Checkbox>

        <div class="mt-6">
          <Button :disabled="submitDisabled">SIGN UP</Button>
        </div>
      </form>

      <p class="mt-5 text-center text-base text-gray-500">
        You have account?
        {{ ' ' }}
        <span
          class="font-medium text-base text-link-blue cursor-pointer"
          @click="handleReturnToLogin"
        >Login now</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from "../form/Input.vue";
import Button from "../form/Button";
import Checkbox from "../form/Checkbox.vue";
import EnvelopeIcon from "../../components/svg/icons/EnvelopeIcon.vue";
import EyeLashIcon from "../../components/svg/icons/EyeLashIcon.vue";
import EyeLashOpenIcon from "../../components/svg/icons/EyeLashOpenIcon.vue";
import ShieldIcon from "../../components/svg/icons/ShieldIcon.vue";
import PersonIcon from "../../components/svg/icons/PersonIcon.vue";

const passwordVisible = ref<boolean>(false);
const passwordConfirmVisible = ref<boolean>(false);

const passwordInputType = computed(() => passwordVisible.value ? "text" : "password");
const passwordConfirmInputType = computed(() => passwordConfirmVisible.value ? "text" : "password");

const store = useSignUpStore();
const otpStore = useOtpStore();

const submitDisabled = computed(() => !store.isValid || store.isLoading);

const handleSetName = (value: string) => {
  store.setName(value);
};
const handleSetEmail = (value: string) => {
  store.setEmail(value);
};
const handleSetPassword = (value: string) => {
  store.setPassword(value);
};
const handleSetPasswordConfirm = (value: string) => {
  store.setPasswordConfirm(value);
};
const handleSetIsTermsAccepted = (value: boolean) => {
  store.setIsTermsAccepted(value);
};

const handleReturnToLogin = () => {
  if (
    store.name ||
    store.email ||
    store.password ||
    store.passwordConfirm
  ) {
    const isReturnConfirmed = confirm("Все данные будут потеряны. Вы уверены?");

    if (isReturnConfirmed) {
      store.setName("");
      store.setEmail("");
      store.setPassword("");
      store.setPasswordConfirm("");
      store.setIsTermsAccepted(false);

      return navigateTo("/login");
    }
  } else {
    return navigateTo("/login");
  }
};

const handleSignIn = () => {
  otpStore.clearOtp();
  navigateTo("/otp");
}
</script>
