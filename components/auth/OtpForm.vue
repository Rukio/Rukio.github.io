<template>
  <div>
    <div class="flex w-full w-[485px] min-h-full flex-1 flex-col justify-center px-4 py-12">
      <h2 class="mb-1 text-left leading-10 text-form-title font-bold tracking-normal text-gray-900">Enter OTP</h2>
      <p class="text-xl text-string-grey">
        Sent OTP on <a href="#" class="font-semibold text-link-blue text-xl">{{ signUpStore.email }}</a>
      </p>
      <span
        class="mt-1 text-link-blue font-bold cursor-pointer self-start"
        @click="handleChangeEmail"
      >Change email</span>

      <form class="mt-6" @submit.prevent="handleSubmit">
        <div class="flex mx-[-10px]">
          <div
            v-for="(_char, index) in otpData"
            :key="index"
            class="w-[64px] mx-[10px]"
          >
            <Input
              :value="otpData[index]"
              placeholder="-"
              otp
              @setValue="handleSetOtp(index, $event)"
            />
          </div>
        </div>

        <div class="mt-6 px-4">
          <Button :disabled="submitDisabled">SUBMIT</Button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from "../form/Input.vue";
import Button from "../form/Button";

const otpData = reactive<string[]>(['', '', '', '', '', '']);

const store = useOtpStore();
const signUpStore = useSignUpStore();

const handleSetOtp = (index: number, value: string) => {
  store.setOtp(index, value);
};
const handleChangeEmail = () => {
  signUpStore.setPassword("");
  signUpStore.setPasswordConfirm("");
  signUpStore.setIsTermsAccepted(false);
  navigateTo("/signup");
};

const submitDisabled = computed(() => !store.isValid || store.isLoading);

const handleSubmit = () => {
  store.submitForm()
    .then(() => {
      alert("Успешно");
    })
    .catch((err) => {
      alert(`Ошибка. ${err}`);
    });
};
</script>
