import { useCityStore } from "@/stores/cityStore";

export default defineNuxtRouteMiddleware(() => {
    const cityStore = useCityStore(); 
    if (!cityStore.authUser) {
      return navigateTo('/login');
    }
});