<template>
    <div class="fixed flex items-center bottom-3 z-20 px-2 w-full justify-center ">
    <div class="bg-white/50 backdrop-blur-sm p-2 py-4 w-full flex items-center justify-center  rounded-full">
      <div class="grid grid-cols-4 gap-x-12 md:gap-x-32 px-4">
        <div>
            <i class="ti ti-home text-stone-700" style="font-size: 28px;"></i>
        </div>
        <div>
          <i class="ti ti-map-pin text-stone-700" style="font-size: 28px;"></i>
      </div>
      <div>
        <i class="ti ti-shopping-cart text-stone-700" style="font-size: 28px;"></i>
    </div>
    <div id="openPanelBtn"  @click="openBottomShit()">
      <i class="ti ti-user text-stone-700" style="font-size: 28px;"></i>
  </div>
      </div>
    </div>
  </div>
  
<div class="fixed top-0 right-0 w-full h-screen bg-gray-500/50 !z-[3000]" @click="closeBottomShit()" v-if="bottomShitStatus == true"></div>

  <div 
  id="profilePanel" 
  class="fixed !z-[3001] bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg p-6 transform translate-y-full transition-transform duration-300"
>
<div class="flex items-center justify-center"> 
  <div>
      <img class="w-16 h-16 object-cover mx-2 rounded-full" src="data:image/jpeg;base64,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" alt="">
      <h3 class="font-bold text-xs mt-2"> {{ authUser != null ? authUser.name : "" }} </h3>
  </div>
</div>
<a href="./nazarsanji.html">
  <div class="flex items-center border-t border-slate-200 gap-x-2 mt-6">
    <div>
      <button class="bg-stone-500 my-2 p-1 px-1.5 rounded-lg"><i class="ti ti-pinned text-white"></i></button>
    </div>
    <div>
      <h3 class="text-xs font-bold"> نظرسنجی</h3>
    </div>
</div>
</a>
<div class="flex items-center border-t border-slate-200 gap-x-2 mt-1">
  <div>
    <button class="bg-green-500 my-2 p-1 px-1.5 rounded-lg"><i class="ti ti-report text-white"></i></button>
  </div>
  <nuxt-link to="/user/report-list" @click="closeBottomShit()">
    <h3  class="text-xs font-bold"> گزارشات من</h3>
  </nuxt-link>
</div>
<div class="flex items-center border-t border-slate-200 gap-x-2 mt-1">
  <div>
    <button class="bg-fuchsia-600 my-2 p-1 px-1.5 rounded-lg"><i class="ti ti-report-medical text-white"></i></button>
  </div>
  <nuxt-link to="/user" @click="closeBottomShit()">
    <h3 class="text-xs font-bold"> ثبت گزارش</h3>
  </nuxt-link>
</div>
<div class="flex items-center border-t border-slate-200 gap-x-2 mt-1" @click="doLogout()">
  <div>
    <button class="bg-red-500 my-2 p-1 px-1.5 rounded-lg"><i class="ti ti-logout-2 text-white"></i></button>
  </div>
  <div
 
  >
    <h3   class="text-xs font-bold"> خروج</h3>
  </div>
</div>


  
</div>
</template>

<script setup >
import { useCityStore } from "@/stores/cityStore";
import { storeToRefs } from "pinia";
  
const config = useRuntimeConfig();
const router = useRouter();
const cityStore = useCityStore();
const { authUser } = storeToRefs(cityStore);
const access_token = useCookie("access_token")

const bottomShitStatus = ref(false)

const openBottomShit = () => {
  if(authUser.value == null) {
    router.push("/login")
  }else {
    bottomShitStatus.value = !bottomShitStatus.value
    const profilePanel = document.getElementById("profilePanel");
    profilePanel.classList.remove("translate-y-full");
  }
    // overlay.classList.remove("hidden");
}

const closeBottomShit = () => {
  bottomShitStatus.value = false
  const profilePanel = document.getElementById("profilePanel");
  profilePanel.classList.add("translate-y-full");
}

const doLogout = async () => {
    if (confirm("آیا می‌خواهید خارج شوید؟")) {
      try {
        const { data, error } = await useFetch(
          `${config.public.apiBaseUrl}/api/v1/auth/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token.value}`,
            },
          }
        );
  
        if (error.value) {
          alert("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
          return;
        }
  
        if (data.value?.status === 200) {
          router.push("/");
          access_token.value = null;
          cityStore.setAuthUserToNull();

          closeBottomShit()
  
          alert(data.value.message);
        } else {
          alert("پاسخ نامعتبر از سرور دریافت شد.");
        }
      } catch (err) {
        alert("خطای غیرمنتظره رخ داده است.");
      }
    }
  };
</script>