<script setup lang="ts">
// APIのレスポンスデータ型をインポートする
import type { UserDetailModel } from "~/api/user";
import { useErrorHandler } from "@/composables/useHttpErrorHandler";
const userDataInfo = ref<UserDetailModel>();
const { handleError } = useErrorHandler();

const errMessge = ref();

// loading画面
const { startLoading, stopLoading } = useLoading();

// フラッシュメッセージ
const { flashMessage, flashMessageType, showFlashMessage, clearFlashMessage } =
  useFlashMessage();

const search = async () => {
  try {
    startLoading();
    const { user } = useApi();
    userDataInfo.value = await user.getData();
    errMessge.value = "";
  } catch (err) {
    handleError(err, {
      404: "ユーザーデータが見つかりません。",
      500: "サーバーエラーが発生しました。管理者に連絡してください。",
    });
  } finally {
    stopLoading();
  }
};
</script>
<template>
  <div>
    {{ userDataInfo?.id }}: {{ userDataInfo?.name }}
    <div class="m-5">
      <!-- <NuxtPage /> -->
      <div class="btn btn-success" @click="search">検索</div>
      <FlashMessage class="fixed top-0 left-0 right-0" />
    </div>
  </div>
</template>
