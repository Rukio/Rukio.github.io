<template>
  <div>
    <div class="flex w-full w-[485px] min-h-full flex-1 flex-col justify-center px-4 py-12">
      <h2 class="mb-1 text-left leading-10 text-form-title font-bold tracking-normal text-gray-900">Login to your Account</h2>
      <p :class="[
        'relative',
        'before:absolute',
        'before:bottom-3',
        'before:left-0',
        'before:w-[120px]',
        'before:bg-string-grey',
        'before:h-[1px]',
        'after:absolute',
        'after:bottom-3',
        'after:right-0',
        'after:w-[120px]',
        'after:bg-string-grey',
        'after:h-[1px]',
        'mb-2',
        'mt-5',
        'text-center',
      ]">with email</p>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="mt-4">
          <Input
            :value="store.email"
            placeholder="Email"
            @setValue="handleSetEmail($event)"
            type="email"
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

        <div class="mt-7">
          <Button :disabled="submitDisabled">LOG IN</Button>
        </div>
      </form>

      <p class="mt-5 text-center text-base text-gray-500">
        Don't have account?
        {{ ' ' }}
        <span @click="handleCreateAccount" class="font-medium text-base text-link-blue cursor-pointer">Create an account</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from "../form/Input.vue";
import Button from "../form/Button";
import EnvelopeIcon from "../../components/svg/icons/EnvelopeIcon.vue";
import EyeLashIcon from "../../components/svg/icons/EyeLashIcon.vue";
import EyeLashOpenIcon from "../../components/svg/icons/EyeLashOpenIcon.vue";
import ShieldIcon from "../../components/svg/icons/ShieldIcon.vue";

const passwordVisible = ref<boolean>(false);
const passwordInputType = computed(() => passwordVisible.value ? "text" : "password");

const store = useLoginStore();

const submitDisabled = computed(() => !store.isValid || store.isLoading);

const handleSetEmail = (value: string) => {
  store.setEmail(value);
};
const handleSetPassword = (value: string) => {
  store.setPassword(value);
};
const handleSubmit = () => {
  store.submitForm()
    .then(() => {
      alert("Аутентифицирован");
    })
    .catch((err) => {
      alert(`Ошибка. ${err}`);
    });
};

const handleCreateAccount = () => {
  store.setEmail("");
  store.setPassword("");
  navigateTo("/signup");
};

</script>
