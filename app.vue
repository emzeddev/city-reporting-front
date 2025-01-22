<template>
  <NuxtLoadingIndicator />
  <LoadingSplash />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import LoadingSplash from '@/components/LoadingSplash.vue'

import { useCityStore } from '~/stores/cityStore';

const cityStore = useCityStore();

// فراخوانی داده در زمان رندر سرور
// await cityStore.fetchData();
</script>