



<template>
    <div 
      v-if="show" 
      class="fixed inset-0 bg-gray-900/50 flex items-center justify-center px-2 !z-[2000]"
      @click.self="closeModal"
    >
      <div 
        class="bg-white rounded-lg w-96 shadow-lg transform transition-all duration-500"
        :class="show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
      >
        <div class="p-4">
          <div class="flex items-center justify-between border-b border-gray-300 pb-2">
            <h3 class="font-bold text-lg">ارسال گزارش</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-red-500">
              ✕
            </button>
          </div>

          
  
          <section class="my-3">
                <div class="flex flex-col items-center justify-center">
                    <label for="fileInput" class="cursor-pointer border-dashed border-2 border-gray-300 p-4 rounded-lg w-full text-center hover:bg-gray-100">
                      <img 
                        id="previewImage" 
                        :src="previewImage || placeholderImage"
                        alt="" 
                        class="w-24 h-24 object-cover mx-auto mb-2 rounded-full"
                      />
                      <span class="text-sm text-gray-500">یک عکس انتخاب کنید</span>
                      <input id="fileInput" class="hidden" @change="handleFileUpload" type="file" accept="image/*">
                    </label>
                  </div>
            </section>


          
  
          <div class="my-3">
            <h3 class="font-bold opacity-70">عنوان گزارش :</h3>
            <input v-model="reportTitle" class="w-full border rounded-lg py-1.5 px-1.5 border-gray-300" type="text">
          </div>

          <div class="my-3">
            <h3 class="font-bold opacity-70"> انتخاب دسته بندی :</h3>
            <select v-model="category" class="w-full p-2 border border-gray-300">
                <option value="گزارش پسماند">گزارش پسماند</option>
                <option value="گزارش خرابی">گزارش خرابی</option>
                <option value="خرابی راه">خرابی راه</option>
            </select>
          </div>
  
          <div class="my-3">
            <h3 class="font-bold opacity-70">توضیحات :</h3>
            <textarea v-model="reportDescription" class="mt-1 w-full h-32 px-2 rounded-lg border border-gray-300"></textarea>
          </div>
  
          <div class="my-5">
            <button v-if="!requestLoading" @click="submitReport" class="bg-green-500 py-3 w-full text-white rounded-lg">
              تایید و ارسال
            </button>
            <button v-else  class="bg-green-500 py-3 w-full text-white rounded-lg flex items-center justify-center">
               <div class="loader"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>

import axios from 'axios';

const requestLoading = ref(false)

const props = defineProps({
    show: {
        required: true,
        type: [Array , Object]
    },
    mapCenter: {
        required: true,
        type: [Array , Object]
    }
})




const emit = defineEmits(['closeModal'])
const config = useRuntimeConfig()


const reportTitle = ref('');
const reportDescription = ref('');
const previewImage = ref(null);
const placeholderImage = 'data:image/png;base64,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';
const imageFile = ref(null)
const category = ref("گزارش خرابی")

const token = useCookie("access_token")


const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
      imageFile.value = file;
    };
    reader.readAsDataURL(file);
  }
};

const submitReport = async () => {
    const formData = new FormData();

    if(reportTitle.value == '' || reportDescription.value == '' || imageFile.value == null || category.value == '') {
        alert('لطفا همه فیلدها را پر کنید')
        return false;
    }

    requestLoading.value = true


    // اضافه کردن داده‌ها به FormData
    formData.append('category', category.value);
    formData.append('title', reportTitle.value);
    formData.append('description', reportDescription.value);
    formData.append('lng', props.mapCenter[0]);
    formData.append('lat', props.mapCenter[1]);

    // اضافه کردن فایل تصویر (در صورتی که انتخاب شده باشد)
    if (imageFile.value) {
        formData.append('image', imageFile.value);
    }

    try {
        const response = await axios.post(
            `${config.public.apiBaseUrl}/api/v1/report/add`, 
            formData, 
            {
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        requestLoading.value = false

        category.value = ""
        reportTitle.value = ""
        reportDescription.value = ""
        imageFile.value = null

        alert("گزارش شما با موفقیت ثبت شد .. لطفا منتظر برسی مدیریت بمانید")

        closeModal()
    } catch (error) {
        console.error('Error submitting report:', error);
    }
};

const closeModal = () => {
    emit('closeModal')
}
</script>

<style scoped>
/* افکت انیمیشن نمایش از پایین به بالا */
.modal-content {
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.translate-y-0 {
  transform: translateY(0);
  opacity: 1;
}


.loader {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      position: relative;
      animation: rotate 1s linear infinite
    }
    .loader::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 3px solid #FFF;
      animation: prixClipFix 2s linear infinite ;
    }

    @keyframes rotate {
      100%   {transform: rotate(360deg)}
    }

    @keyframes prixClipFix {
        0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
        25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
        50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
        75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
        100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }
</style>