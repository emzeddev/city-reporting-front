<template>
  <div v-if="loading" class="loading-splash">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const loading = ref(false);

onMounted(() => {
  const nuxtApp = useNuxtApp();
  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  });
});
</script>

<style scoped>
.loading-splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(30, 30, 30, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #333;
  border-top: 5px solid #2c43f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
