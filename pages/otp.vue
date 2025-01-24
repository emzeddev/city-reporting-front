<template>
  <div class="mx-auto w-full bg-gray-100 text-gray-900 min-h-screen">
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
                stroke="#fff"
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
          class="flex items-center justify-center lg:mt-20 md:mt-32 mt-20 text-gray-900"
        >
          گزارش گیری مشکلات شهری
        </nuxt-link>
        <div class="pt-5 flex items-center justify-center">
          <h3 class="text-gray-900 py-3">ورود به حساب کاربری</h3>
        </div>

        <div class="flex items-center justify-center mt-1 py-2">
          <form @submit.prevent="submitForm()" class="relative text-sm rounded-full">
            <div class="relative mt-2 text-sm border border-gray-400 rounded-full">
              <input
                class="w-full text-gray-900 p-4 md:pl-32 pl-20 bg-white rounded-full"
                type="text"
                placeholder="کد را وارد کنید"
                v-model="formData.code"
              />
            </div>
            <p v-if="errors.code" class="text-red-500">{{ errors.code }}</p>

            <div class="flex items-center justify-center mt-3">
              <span class="text-gray-700">زمان باقی مانده : {{ formattedTime }}</span>
            </div>

            <div class="flex items-center justify-center py-5">
              <button
                type="submit"
                v-if="registerLoading == false"
                class="bg-blue-500 px-10 text-white py-4 w-full rounded-full tracking-wide font-semibold focus:outline-none hover:bg-blue-700 shadow-lg"
              >
                {{ route.query.action == 'login' ? 'ورود' : 'عضویت' }}   
              </button>
              <button
                type="button"
                v-if="registerLoading == true"
                disabled
                class="bg-blue-500 text-white px-10 py-4 w-full rounded-full tracking-wide font-semibold focus:outline-none hover:bg-blue-700 shadow-lg"
              >
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</div>

</template>

  
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRouter , useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute()

  const registerData = useCookie('register_data')
  const registerLoading = ref(false)
  const config = useRuntimeConfig();
  const access_token = useCookie("access_token")
  const loginData = useCookie("login_data")

  const timeLeft = ref(120); // مدت زمان تایمر
  let timerInterval = null;

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (timeLeft.value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });


  const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval); // اگر تایمر قبلی وجود دارد، پاک شود
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0) {
        timeLeft.value--;
        } else {
        clearInterval(timerInterval); // وقتی تایمر به صفر رسید، متوقف شود
        }
    }, 1000);
  };
  

  onMounted(() => {
    startTimer();
  });

  onUnmounted(() => {
    clearInterval(timerInterval);
  });

  const goBack = () => {
    router.back();
  };

  const formData = ref({
    code: ""
  });

  const errors = ref({
    code: null,
  });

const validateForm = () => {
    let valid = true;
    errors.value = { code: null };

    const codeRegex = /^[0-9]{6}$/; // فرمت کد 6 رقمی
    if (!formData.value.code.trim()) {
        errors.value.code = "کد نمی‌تواند خالی باشد.";
        valid = false;
    } else if (!codeRegex.test(formData.value.code)) {
        errors.value.code = "فرمت کد صحیح نیست. کد باید 6 رقم عددی باشد.";
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

    let requestUrl = null;
    let requestBody = {};
    if(route.query.action == 'login') {
        requestUrl = `${config.public.apiBaseUrl}/api/v1/auth/signIn`;
        requestBody = {
            otp: formData.value.code,
            mobile: loginData.value.mobile
        }

    }else if(route.query.action == 'register') {
        requestUrl = `${config.public.apiBaseUrl}/api/v1/auth/signUp`;
        requestBody =  {
            otp: formData.value.code,
            name: registerData.value.name,
            mobile: registerData.value.mobile
        }
    }

    const { data } = await useFetch(requestUrl , {
      method: "POST",
      body: requestBody,
    });

    registerLoading.value = false

    if(data.value.status == 200) {
        access_token.value = data.value.access_token
        registerData.value = null
        router.push("/")
    }else {
      alert(data.value.message)
    }

  } catch (error) {
    registerLoading.value = false
  }
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
  