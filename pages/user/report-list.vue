<template>
<main>

            <section class="px-4 my-3 mt-20" v-if="reportList.data.length != 0">
                <div class="bg-white rounded-lg mt-2 p-2" v-for="(report , index) in reportList.data" :key="index">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-x-2">
                            <h3 class="text-sm font-bold opacity-80"> {{report.title}}</h3>
                            
                        </div>
                        
                        <div class="flex items-center gap-x-1">
                            <button class="bg-green-100 text-xs rounded-lg text-stone-500 font-bold p-1 opacity-70">1402/2/1</button>
                        </div>
                    </div>
                    <p class="block">{{report.description}}</p>
                    <div class="my-3 flex items-center gap-x-2">
                        <span class="font-bold text-xs opacity-70 ">وضعیت طرح :</span>
                        <button class="bg-stone-50 p-2 font-bold text-xs opacity-70 text-stone-500 rounded-lg " v-if="report.status == 'pending'"> در انتظار برسی</button>
                        <button class="bg-stone-50 p-2 font-bold text-xs opacity-70 text-stone-500 rounded-lg " v-if="report.status == 'in_progress'">در حال برسی</button>
                        <button class="bg-stone-50 p-2 font-bold text-xs opacity-70 text-stone-500 rounded-lg " v-if="report.status == 'completed'"> تایید شده </button>
                    </div>
                </div>
            </section>
            <section class="px-4 my-3 mt-20" v-else>
                <p>لیست خالی میباشد</p>
            </section>

           
       </main>
</template>

<script setup>
 import {onMounted} from 'vue'

 const config = useRuntimeConfig()
 const access_token = useCookie("access_token")



const { data: reportList, error } = await useAsyncData(() =>
  $fetch(`${config.public.apiBaseUrl}/api/v1/report/get-report-list`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${access_token.value}`,
    },
  })
);

console.log(reportList)

 definePageMeta({
      layout: "userdashboard",
      middleware: "auth"
  })
</script>