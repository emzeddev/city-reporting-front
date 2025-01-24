<template>
  <!-- <header class="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-400">گزارش مشکلات شهری</h1>
      <div v-if="authUser == null">
        <nuxt-link to="/login" class="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2 hover:bg-blue-700 transition">
          ورود
        </nuxt-link>
        <nuxt-link to="/register" class="px-4 mr-1 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
          ثبت نام
        </nuxt-link>
      </div>
      <div v-else>
        <nuxt-link to="/user" class="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2 hover:bg-blue-700 transition">
          {{ authUser.name }}
        </nuxt-link>
      </div>
    </header> -->

  <!-- <header class="px-4 pt-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <div>
          <img class="w-10 h-10" src="/mn.png" alt="" />
        </div>
      </div>
      <div>
        <nuxt-link class="styles_Link__RMyqc " to="/user"
          ><button
            class="border border-gray-300 rounded-lg justify-center px-3 py-2 relative flex items-center user-select-none styles_btn__Q4MvL text-button-2 styles_btn--medium__4GoNC styles_btn--neutralOutlined__mLWvq styles_btn--black__xj6Mt rounded-medium whitespace-nowrap shrink-0 ml-2 lg:ml-0"
            data-cro-id="header-profile"
          >
            <div class="flex items-center justify-center grow">
              <i class="ti ti-user ml-2"></i>  
              <span v-if="authUser == null">ورود | ثبت&zwnj;نام </span>
              <span v-else>{{ authUser.name }}</span>
            </div>
          </button>
          </nuxt-link>
      </div>
    </div>
  </header> -->

  <!-- <header class="px-4 pt-4">
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-2">
            <div v-if="authUser == null">
              <nuxt-link to="/login" class="px-4 py-2 bg-sky-600 text-white rounded-lg mr-2 hover:bg-sky-700 transition">
                ورود
              </nuxt-link>
              <nuxt-link to="/register" class="px-4 mr-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-60 transition">
                ثبت نام
              </nuxt-link>
            </div>
            <div class="" v-else>
                <h3 class="text-slate-400 text-xs font-bold">سلام {{authUser.name}} خوش امدی !</h3>
            </div>
        </div>
        <nuxt-link to="/user" v-if="authUser != null">
            <i class="ti ti-logout-2 text-red-500"></i>
        </nuxt-link>
      </div>
  </header> -->
</template>

<script setup>
import { useCityStore } from "@/stores/cityStore";
import { storeToRefs } from "pinia";

const cityStore = useCityStore();

const { authUser } = storeToRefs(cityStore);
</script>
