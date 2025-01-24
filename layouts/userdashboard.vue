<template>
    <div class="dark">
      <div class="min-h-screen flex bg-gray-100 ">
        <!-- Sidebar -->
        <Sidebar
          :isOpen="isMenuOpen"
          @toggle="toggleMenu"
          @closeSidebar="isMenuOpen = false"
        />
  
        <div
          v-if="isMenuOpen == true"
          @click="toggleMenu"
          class="fixed top-0 left-0 bg-black/30 w-[100vw] h-full !z-[2000]"
        ></div>
  
        <!-- Main Content -->
        <div v-if="authUser != null" class="flex-1">

          <button
              class="absolute top-3 right-0 !z-[3000] block md:hidden bg-white text-gray-400 shadow-lg px-3 py-2 rounded mt-2 mr-5"
              @click="toggleMenu()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10 6h10" />
                <path d="M4 12h16" />
                <path d="M7 12h13" />
                <path d="M4 18h10" />
              </svg>
            </button>


          <slot />
        </div>
      </div>
    </div>
</template>
  <script setup>
  import { useCityStore } from "@/stores/cityStore";
  import { storeToRefs } from "pinia";
  
  import Sidebar from "~/components/userDashboard/Sidebar.vue";
  import { ref } from "vue";
  
  const isDarkMode = ref(false);
  const isMenuOpen = ref(false);
  
  const cityStore = useCityStore();
  const { authUser } = storeToRefs(cityStore);
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  </script>
  