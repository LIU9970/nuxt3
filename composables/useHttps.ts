import type { FetchResponse, SearchParameters } from 'ofetch'

export interface ResOptions<T> {
  data: T
  code: number
  message: string
  success: boolean
}

const handleError = <T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) => {
  // const err = (text: string) => {
  //   Message.error({
  //     content: response?._data?.message ?? text,
  //     icon: () => h(IconEmoticonDead),
  //   })
  // }
  // if (!response._data) {
  //   err('请求超时，服务器无响应！')
  //   return
  // }
  // const userStore = useUserStore()
  // const handleMap: { [key: number]: () => void } = {
  //   404: () => err('服务器资源不存在'),
  //   500: () => err('服务器内部错误'),
  //   403: () => err('没有权限访问该资源'),
  //   401: () => {
  //     err('登录状态已过期，需要重新登录')
  //     userStore.clearUserInfo()
  //     // TODO 跳转实际登录页
  //     navigateTo('/')
  //   },
  // }
  // handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')

  if (!response._data) {
    // タイムアウトなど
  }

  if (response.status === 404) {

  }
}

// get方法传递数组形式参数
const paramsSerializer = (params?: SearchParameters) => {
  if (!params)
    return

  const query = structuredClone(params)
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === 'object' && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
      delete query[key]
    }
  })
  return query
}


const fetch = $fetch.create({
  // 请求拦截器
  onRequest({ options }) {
    // get方法传递数组形式参数
    options.params = paramsSerializer(options.params)
    // 添加baseURL,nuxt3环境变量要从useRuntimeConfig里面取
    const { public: { apiBase } } = useRuntimeConfig()
    options.baseURL = "http://127.0.0.1:3658/m1/652082-622084-default"
    options.headers = new Headers(options.headers)
  },
  // 响应拦截
  onResponse({ response }) {
    if (response.status === 200)
      return response._data
    // 在这里判断错误
    // レスポンスの中に、codeがある場合：
    if (response.status !== 200) {
      return Promise.reject(response)
    }
  },
  // 错误处理
  onResponseError({ response }) {
    handleError(response)
    return Promise.reject(response?._data ?? null)
  },
})

// 自动导出
export const useHttp = {
  get: <T>(url: string, params?: any) => {
    return fetch<T>(url, { method: 'get', params })
  },

  post: <T>(url: string, body?: any) => {
    return fetch<T>(url, { method: 'post', body })
  },

  put: <T>(url: string, body?: any) => {
    return fetch<T>(url, { method: 'put', body })
  },

  delete: <T>(url: string, body?: any) => {
    return fetch<T>(url, { method: 'delete', body })
  },
}
