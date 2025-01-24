<template>



    <section class="mt-5 px-4">
         <!-- Swiper -->
        <swiper
        :slides-per-view="1"
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
            slidesPerView: 1,
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
                <div class="relative overflow-hidden">
                    <img class="w-full rounded-xl object-cover h-52" src="https://media.mehrnews.com/d/2018/01/10/4/2685481.jpg" alt="">
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-t via-black/40 from-black to-slate-100/0">

                    </div>
                    <div class="absolute bottom-4 right-4">
                        <h3 class="text-sm font-bold text-white">ساختمان قدیم شهرداری خوی</h3>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <div class="relative overflow-hidden">
                    <img class="w-full rounded-xl object-cover h-52" src="https://itto.org/iran/image-bin/181911020149t7g5afdt7k.jpg?fillit=1200x660" alt="">
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-t via-black/40 from-black to-slate-100/0">

                    </div>
                    <div class="absolute bottom-4 right-4">
                        <h3 class="text-sm font-bold text-white">آرامگاه پوریای ولی</h3>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <div class="relative overflow-hidden">
                    <img class="w-full rounded-xl object-cover h-52" src="https://www.alaedin.travel/Files/Jazebe/khoy/shams-e-tabrizi-minaret-in-khoy/Alaedin-Travel-Shamse-Tabrizi-Minaret-In-Khoy-View.jpg" alt="">
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-t via-black/40 from-black to-slate-100/0">

                    </div>
                    <div class="absolute bottom-4 right-4">
                        <h3 class="text-sm font-bold text-white">شمس تبریزی</h3>
                    </div>
                </div>
            </swiper-slide>
        
        </swiper>
    </section>
</template>

<script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Pagination, Autoplay } from "swiper/modules";

  const modules = [Autoplay];
</script>