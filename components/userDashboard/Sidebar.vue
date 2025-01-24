<template>
    <div
      v-if="authUser != null"
      class="!z-[5000] fixed inset-y-0 right-0 md:static  md:translate-x-0 transform md:w-64 w-64 bg-white  shadow-lg transition-transform"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="p-4 border-b border-gray-200">
        <h1 class="text-lg font-bold text-gray-800 ">
          {{ authUser.name }}
        </h1>
      </div>
      <nav class="mt-4">
        <ul>
          <li v-for="item in menuItems" :key="item.name" class="my-2">
            <a
              href="javascript:void(0)"
              @click="doLogout()"
              class="block px-4 py-2 text-gray-700  hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              v-if="item.name == 'خروج'"
            >
              خروج
            </a>
            <NuxtLink
              v-else
              :to="item.link"
              @click="$emit('closeSidebar')"
              class="block px-4 py-2 text-gray-700  hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
</template>
  
  <script setup>
  import { useCityStore } from "@/stores/cityStore";
  import { storeToRefs } from "pinia";
  
  const config = useRuntimeConfig();
  const router = useRouter();
  const cityStore = useCityStore();
  const { authUser } = storeToRefs(cityStore);
  

  
  const props = defineProps({
    isOpen: Boolean,
  });
  
  const menuItems = [
    { name: " ثبت گزارش", link: "/user" },
    { name: " گزارشات من", link: "/user/report-list" },
    { name: "خروج", link: "/" },
  ];
  
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
          shadfilmStore.setAuthUserToNull();
  
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
  
  <style scoped>
  /* Optional styles for smooth transitions */
  </style>
  