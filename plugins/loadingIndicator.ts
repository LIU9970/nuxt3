import { defineNuxtPlugin } from '#app';
import { ref } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  const isLoading = ref(false);

//   // 页面开始加载时自动触发
//   nuxtApp.hook('page:loading:start', () => {
//     isLoading.value = true;
//   });

//   // 页面加载完成时自动触发
//   nuxtApp.hook('page:loading:end', () => {
//     isLoading.value = false;
//   });

  // 手动触发加载状态
  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  // 提供加载控制的相关函数和状态
  nuxtApp.provide('loading', {
    isLoading,
    startLoading,
    stopLoading,
  });
});
