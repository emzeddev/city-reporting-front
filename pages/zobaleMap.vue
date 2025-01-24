<template>
    <div class="h-screen bg-gray-100 sm:p-4">
      <client-only>
        <div style="font-family: iransansx;" id="map" class="w-full h-full relative rounded-lg"></div>
      </client-only>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const mapCenter = ref([44.972, 38.55]);
  
  useHead({
    script: [
      { src: "/mapbox/mapbox-gl.js" },
      { src: "/mapbox/mapboxrtl.js" }
    ],
    link: [
      { type: "text/css", rel: "stylesheet", href: "/mapbox/mapbox-gl.css" }
    ],
  });
  
  onMounted(async () => {
    map_init();
  });
  
  let map = null;
  
  // محدوده دقیق شهرستان خوی
  const khuoyBounds = {
  minLng: 44.90,
  maxLng: 45.00,
  minLat: 38.50,
  maxLat: 38.60,
};
  
  // تولید مختصات تصادفی فقط در محدوده خوی
  const getRandomLocationInKhoy = () => {
    const randomLng = Math.random() * (khuoyBounds.maxLng - khuoyBounds.minLng) + khuoyBounds.minLng;
    const randomLat = Math.random() * (khuoyBounds.maxLat - khuoyBounds.minLat) + khuoyBounds.minLat;
    return [randomLng, randomLat];
  };
  
  const map_init = () => {
    setTimeout(() => {
      mapboxgl.accessToken = "pk.eyJ1IjoiaHNuZW16ZWQiLCJhIjoiY202OGJicWkyMDFyYzJpc2lienJ2eWhveiJ9.FWSpv5qS1-yQ6Zu4-rGrjg";
  
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/hsnemzed/clotwhfvh00s801pm2u1sce3v",
        center: mapCenter.value,
        zoom: 14,
      });
  
      const nav = new mapboxgl.NavigationControl({ visualizePitch: true });
      map.addControl(nav, "top-left");
  
      // تولید 10 مختصات تصادفی
      const markers = [];
      for (let i = 0; i < 10; i++) {
        markers.push(getRandomLocationInKhoy());
      }
  
      // انتخاب تصادفی 5 مارکر برای نمایش "پر شده"
      const filledIndexes = new Set();
      while (filledIndexes.size < 5) {
        filledIndexes.add(Math.floor(Math.random() * 10));
      }
  
      markers.forEach((coords, index) => {
        const el = document.createElement('div');
        el.className = 'custom-marker';
  
        if (filledIndexes.has(index)) {
          // مارکرهایی که دارای متن "پر شده" هستند
          el.innerHTML = `
            <div class="marker-label bg-red-500 text-white px-3 rounded-full text-xs mb-3">پر شده</div>
            <img src="/porshode.png" class="marker-icon w-5" />
          `;
        } else {
          // مارکرهایی که متن ندارند و تصویر متفاوتی دارند
          el.innerHTML = `
            <img src="/smart-r (1).png" class="marker-icon w-5" />
          `;
        }
  
        new mapboxgl.Marker(el)
          .setLngLat(coords)
          .addTo(map);
      });
    }, 500);
  };
  </script>
  
  <style scoped>
  .custom-marker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .marker-icon {
    width: 50px;
    height: 50px;
  }
  
  .marker-label {
    position: absolute;
    top: -20px;
    background-color: red;
    color: white;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
    font-family: 'iransansx';
  }
  </style>
  