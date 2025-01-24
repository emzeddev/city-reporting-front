<template>
    <div class="mx-auto w-full h-[100vh] bg-gray-100 text-gray-900">
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:mt-20 mt-2">
          <div class="w-full h-full">
            <div class="flex items-center justify-start lg:px-12 px-2">
              <a href="javascript:void(0)" @click="goBack()">
                <button class="p-2 bg-blue-500 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M13 18l6 -6" />
                    <path d="M13 6l6 6" />
                  </svg>
                </button>
              </a>
            </div>
            <nuxt-link
              to="/"
              class="flex items-center justify-center lg:mt-20 md:mt-32 mt-20 text-gray-800 text-2xl font-bold"
            >
              گزارش گیری مشکلات شهری
            </nuxt-link>
            <div class="pt-5 flex items-center justify-center">
              <h3 class="text-gray-900 py-3">ساخت حساب کاربری</h3>
            </div>
  
            <form @submit.prevent="submitForm()" class="flex items-center flex-col justify-center py-1">
              <div class="relative text-sm border border-gray-300 rounded-full">
                <input
                  class="w-full text-gray-900 p-4 md:pl-32 pl-20 bg-gray-200 rounded-full"
                  type="text"
                  v-model="formData.name"
                  placeholder="نام خانوادگی "
                />
              </div>
              <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
  
              <div class="relative mt-2 text-sm border border-gray-300 rounded-full">
                <input
                  class="w-full text-gray-900 p-4 md:pl-32 pl-20 bg-gray-200 rounded-full"
                  type="text"
                  v-model="formData.mobile"
                  placeholder="شماره موبایل"
                />
              </div>
              <p v-if="errors.mobile" class="text-blue-500">{{ errors.mobile }}</p>
  
              <div class="relative mt-4">
                <button
                  type="submit" v-if="registerLoading == false"
                  class="bg-blue-500 px-10 text-white py-4 w-full rounded-full tracking-wide font-semibold focus:outline-none hover:bg-blue-700 shadow-lg"
                >
                  ارسال کد
                </button>
                <button
                  type="button" v-if="registerLoading == true" disabled 
                  class="bg-blue-500 text-white px-10 py-4 w-full rounded-full tracking-wide font-semibold focus:outline-none hover:bg-blue-700 shadow-lg"
                >
                  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </button>
              </div>
            </form>
  
            <div class="flex items-center justify-center py-2 text-xs">
              <h4>
                <span class="text-blue-500 font-semibold">آیا حساب کاربری دارید؟ </span>
                <nuxt-link to="/login" class="text-gray-900">وارد شوید</nuxt-link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

  
  <script setup>
  import { useRouter } from "vue-router";
  
  const registerData = useCookie('register_data')
  
  const config = useRuntimeConfig();
  const router = useRouter();
  
  
  const registerLoading = ref(false)
  
  const formData = ref({
    name: "",
    mobile: "",
  });
  
  const errors = ref({
    name: null,
    mobile: null,
  });
  
  const validateForm = () => {
    let valid = true;
    errors.value = { name: null, mobile: null };
  
    // اعتبارسنجی نام
    if (!formData.value.name.trim()) {
      errors.value.name = "نام نمی‌تواند خالی باشد.";
      valid = false;
    } else if (formData.value.name.length < 3) {
      errors.value.name = "نام باید حداقل ۳ حرف باشد.";
      valid = false;
    }
  
    // اعتبارسنجی شماره موبایل
    const mobileRegex = /^09[0-9]{9}$/; // فرمت شماره موبایل ایران
    if (!formData.value.mobile.trim()) {
      errors.value.mobile = "شماره موبایل نمی‌تواند خالی باشد.";
      valid = false;
    } else if (!mobileRegex.test(formData.value.mobile)) {
      errors.value.mobile = "فرمت شماره موبایل صحیح نیست.";
      valid = false;
    }
  
    return valid;
  };
  
  
  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }
  
    registerLoading.value = true
  
    try {
      const { data } = await useFetch(`${config.public.apiBaseUrl}/api/v1/auth/sendCode`, {
        method: "POST",
        body: formData.value,
      });
      registerLoading.value = false
  
      if(data.value.status == 200) {
        registerData.value = formData.value
        router.push("/otp?action=register")
      }else {
        alert(data.value.message)
      }
  
    } catch (error) {
      registerLoading.value = false
    }
  };
  
  
  const goBack = () => {
    router.back();
  };
  
  definePageMeta({
    layout: "auth",
    middleware: "guest"
  });
  </script>
  
  
  
  <style scoped>
  .register_text {
    color: #333 !important;
    border-bottom: 1px solid #333;
  }
  
  .errorphone {
    display: block;
    text-align: center;
    background: rgb(255 0 0 / 10%);
    border-radius: 20px;
    margin-top: 10px;
  }
  
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 18px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgb(31, 29, 29);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 5px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 5px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 29px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 53px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
  </style>
  