<template>
  <div
    v-if="flashMessage"
    :class="['alert', typeClass, 'p-2', 'fs-6', 'mt-1', 'mb-1', 'mx-auto']"
    role="alert"
  >
    {{ flashMessage }}
  </div>
</template>

<script lang="ts" setup>
const { flashMessage, flashMessageType } = useFlashMessage();

const typeClass = computed(() => {
  const classes = {
    info: "alert-info",
    danger: "alert-danger",
    success: "alert-success",
    warning: "alert-warning",
    dark: "alert-dark",
  };

  return flashMessageType.value
    ? classes[flashMessageType.value]
    : classes.info;
});
</script>
