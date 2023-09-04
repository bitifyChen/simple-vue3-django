import request from '@/api/setting/useApi.js'

export const useAccountApi = {
  // 取得權限
  login: (payload) => request('post', 'https://b.njlab.website/api/token/', payload)
}
