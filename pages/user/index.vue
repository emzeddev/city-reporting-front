<template>
    <div class="h-screen bg-gray-100 sm:p-4">
      <client-only>
        <div style="font-family: iransansx;" id="map" class="w-full h-full relative rounded-lg">
          <div class="absolute lg:top-5 top-1 lg:right-5 right-0 w-full h-[40px] !z-[1000]">


            


            <div class="relative w-full h-full p-5 mt-16">
              <input v-model="searchTerm" class="bg-white focus:ring-0 text-lg outline-0 w-full h-[70px] text-black  shadow-lg rounded-lg  pr-2" placeholder="جستجو کنید ..." type="text" />
              
              <div class="relative px-5">
                <div class="absolute top-2 shadow-lg rounded-lg right-0 bg-white w-full h-[300px] overflow-y-scroll" v-if="searchResult.length != 0">
                <ul>
                  <li @click="flyToAddress(result)" class="text-gray-700 text-md font-bold p-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer" v-for="(result  , index) in searchResult" :key="index">
                    <p class="text-lg">{{ result.title }}</p>
                    <p class="text-xs">{{ result.region }}</p>
                  </li>
                </ul>
              </div>
              </div>
            </div>
            
          
          </div>

          <div @click="openAddReportModal()" class="absolute bottom-2 right-0 w-full h-[70px]  !z-[1000] flex items-center justify-end p-2">
            <button class="bg-blue-500 w-full text-white rounded-lg py-4 px-10 text-lg hover:bg-blue-600">ثبت گزارش</button>
          </div>

          <ReportModal :mapCenter="mapCenter" :show="reportModalStatus" @closeModal="reportModalStatus = false" />
        </div>
      </client-only>
    </div>
</template>
  
  
  <script setup>
  import { useCityStore } from "@/stores/cityStore";
  import { storeToRefs } from "pinia";
  import ReportModal from '@/components/userDashboard/ReportModal.vue'


  
  import { ref, onMounted , watch } from 'vue';
  const cityStore = useCityStore();
  const { authUser } = storeToRefs(cityStore);

  const reportModalStatus = ref(false)

  const mapContainer = ref(null);

  const searchResult = ref([])

  useHead({
    script: [
      {
        src: "/mapbox/mapbox-gl.js",
      },
      {
        src: "/mapbox/mapboxrtl.js",
      },
      {
        src: "/mapbox/mapbox-gl-geocoder.min.js",
      },
    ],
    link: [
      {
        type: "text/css",
        rel: "stylesheet",
        href: "/mapbox/mapbox-gl.css",
      },
      {
        type: "text/css",
        rel: "stylesheet",
        href: "/mapbox/mapbox-gl-geocoder.css",
      },
    ],
  });

const mapCenter = ref([44.95, 38.55]);
const searchTerm = ref(null)


const openAddReportModal = () => {
  reportModalStatus.value = !reportModalStatus.value
}


onMounted(async () => {

  map_init();
});

let map = null

const map_init = () => {
  setTimeout(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaHNuZW16ZWQiLCJhIjoiY202OGJicWkyMDFyYzJpc2lienJ2eWhveiJ9.FWSpv5qS1-yQ6Zu4-rGrjg";

    const khuoyBounds = [
      [44.85, 38.50], // Southwest corner (پایین چپ)
      [45.05, 38.65]  // Northeast corner (بالا راست)
    ];

    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/hsnemzed/clotwhfvh00s801pm2u1sce3v",
      center: mapCenter.value,
      zoom: 16,
    });

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });

    // map.addControl(nav, "top-left");

    const marker = new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat(mapCenter.value)
      .addTo(map);

    map.on("move", function (e) {
      mapCenter.value = [map.getCenter().lng, map.getCenter().lat];
      marker.setLngLat(map.getCenter());
    });

    marker.setDraggable(false);

    


    
  }, 500);
};

watch(searchTerm , (newVal) => {
  if(newVal != "") {
    searchLocation(newVal)
  }else {
    searchResult.value = []
  }
})


const searchLocation = async (query) => {
  try {
    const response = await fetch(
      `https://api.neshan.org/v1/search?term=${query}&lat=38.5504&lng=44.9521`,
      {
        headers: {
          "Api-Key": "service.74eae66a6e6b40169ec23a813aa02ea1",
        },
      }
    );

    const data = await response.json();
    // console.log(data);

    
    if (data.count > 0) {
      searchResult.value = data.items
      // console.log(searchResult.value)


    }

  } catch (error) {
    console.error("خطا در جستجو:", error);
  }
};


const flyToAddress = (result) => {
  map.flyTo({ center: [result.location.x , result.location.y], zoom: 16 });
  searchResult.value = []
}


  definePageMeta({
      layout: "userdashboard",
      middleware: "auth"
  })
  </script>