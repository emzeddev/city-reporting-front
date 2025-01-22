<template>
    <header class="bg-gray-800 shadow-md p-4 flex justify-between items-center">
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
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2 hover:bg-blue-700 transition">
          {{ authUser.name }}
        </button>
      </div>
    </header>
</template>

<script setup >
import { useCityStore } from "@/stores/cityStore";
import { storeToRefs } from "pinia";

const { authUser } = storeToRefs(useCityStore);
</script>