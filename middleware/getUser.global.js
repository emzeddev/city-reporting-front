import { useCityStore } from "@/stores/cityStore";

export default defineNuxtRouteMiddleware(async () => {

    const config = useRuntimeConfig()
    const cookie = useCookie('access_token'); 
    const token = cookie.value;
  
    if (token) {
      try {

        const { data: user, error } = await useFetch(`${config.public.apiBaseUrl}/api/v1/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        

        if (error.value) {
          return navigateTo('/login');
        }
  
        if(Object.keys(user.value).length !== 0) {
          const cityStore = useCityStore(); 
          cityStore.setAuthUser(user);

        }


      } catch (error) {
        console.error('Error fetching user data');

        return navigateTo('/login');
      }
    }
  });
  