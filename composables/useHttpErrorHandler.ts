import { useFlashMessage } from '~/composables/useFlashMessage';

type CustomErrorMessages = { [statusCode: number]: string };

export function useErrorHandler() {
  const { showFlashMessage } = useFlashMessage();
  const handleError = (
    err: unknown,
    customMessages?: CustomErrorMessages,
  ): string => {
    if (err instanceof Response) {
      console.error('Error fetching data:', err.status);

      const defaultMessages: CustomErrorMessages = {
        400: '不正なリクエストです。',
        401: '認証に失敗しました。',
        403: 'アクセスが禁止されています。',
        404: 'データが見つかりません。',
        500: 'サーバー内部エラーが発生しました。',
        // 其他默认错误消息
      };

      const message =
        customMessages?.[err.status] ||
        defaultMessages[err.status] ||
        'エラーが発生しました。';

    showFlashMessage(message, 'danger', 'persist');
      return message;
    } else if (err instanceof Error) {
      console.error('Unknown error:', err.message);
      showFlashMessage(err.message, 'danger', 'persist');
      return err.message;
    } else {
      console.error('An unexpected error occurred:', err);
      const message = '予期しないエラーが発生しました。';
      showFlashMessage(message, 'danger', 'persist');
      return message;
    }
  };

  return {
    handleError,
  };
}
