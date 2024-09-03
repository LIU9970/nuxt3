<template>
  <div v-if="isLoading" class="loading-indicator">
    <!-- 这里可以放置你想要的加载动画或文本 -->
    <span>Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";

const nuxtApp = useNuxtApp();
const { isLoading } = nuxtApp.$loading as {
  isLoading: Ref<boolean>;
};
</script>

<style scoped>
.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5em;
  z-index: 9999;
}
</style>
