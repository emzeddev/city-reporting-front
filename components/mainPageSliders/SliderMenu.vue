<template>
    <section class="mt-5 px-4">
        <swiper
        :slides-per-view="4"
        :space-between="10"
        :freeMode="true"
        :navigation="{
            nextEl: '.swiper--next',
            prevEl: '.swiper--prev',
        }"
        :pagination="{
            el: '.swiper-pagination',
            clickable: true,
        }"
        :modules="modules"
        :breakpoints="{
            640: {
            slidesPerView: 4,
            spaceBetween: 10,
            },
            768: {
            slidesPerView: 4,
            spaceBetween: 10,
            },
            1024: {
            slidesPerView: 5,
            spaceBetween: 10,
            },
        }"
        class="swiper-container relative"
        >
                <swiper-slide class="swiper-slide">
                    <div class="flex items-center">
                        <div >
                            <button class="p-3 px-3.5 bg-sky-500 rounded-full"><i class="ti ti-plane-tilt text-white" style="font-size: x-large;"></i></button>
                            <h2 class="text-xs opacity-70 font-bold text-center pt-1">پرواز ها</h2>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <div class="flex items-center">
                        <div >
                            <button class="p-3 px-3.5 bg-sky-500 rounded-full"><i class="ti ti-bus text-white" style="font-size: x-large;"></i></button>
                            <h2 class="text-xs opacity-70 font-bold text-center pt-1">اتوبوس</h2>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <div class="flex items-center">
                        <div >
                            <button class="p-3 px-3.5 bg-sky-500 rounded-full"><i class="ti ti-building-skyscraper text-white" style="font-size: x-large;"></i></button>
                            <h2 class="text-xs opacity-70 font-bold text-center pt-1">هتل</h2>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <a href="./makantablig.html">
                        <div class="flex items-center">
                            <div >
                                        <button class="p-3 px-3.5 bg-sky-500 rounded-full"><i class="ti ti-map-pin text-white" style="font-size: x-large;"></i></button>
                                        <h2 class="text-xs opacity-70 font-bold text-center pt-1">گردشگری</h2>
                            </div>
                        </div>
                    </a>
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <div class="flex items-center">
                        <div >
                                    <button class="p-3 px-3.5 bg-sky-500 rounded-full"><i class="ti ti-parking-circle text-white" style="font-size: x-large;"></i></button>
                                    <h2 class="text-xs opacity-70 font-bold text-center pt-1">پارکینگ</h2>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <button class="p-3 px-3.5 bg-sky-500 rounded-full"><i class="ti ti-plane-tilt text-white" style="font-size: x-large;"></i></button>
                </swiper-slide>
        </swiper>

    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Pagination, Autoplay } from "swiper/modules";

  const modules = [Autoplay];
</script>