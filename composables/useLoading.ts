import { useNuxtApp } from '#app';

export function useLoading() {
  const nuxtApp = useNuxtApp();
  const { startLoading, stopLoading, isLoading } = nuxtApp.$loading as {
    isLoading: Ref<boolean>;
    startLoading: () => void;
    stopLoading: () => void;
  };

  return { isLoading, startLoading, stopLoading };
}
