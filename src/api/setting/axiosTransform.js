import { getAccessToken, removeTokens } from './useToken.js'
import router from '@/router/index.js'

const transform = {
  requestInterceptor(config) {
    // 請求Header，+token
    const accessToken = getAccessToken()
    const lang = localStorage.getItem('lang') || 'zh_CN'
    if (accessToken && accessToken !== 'undefined') {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    config.headers['Accept-Language'] = lang
    return config
  },
  requestInterceptorCatch(error) {
    console.log(error)
    // 请求错误，这里可以用全局提示框进行提示
    delete error.headers.Authorization
    removeTokens()
    return Promise.reject(error)
  },
  responseInterceptor(result) {
    const res = result
    return res.data
  },
  responseInterceptorCatch(error) {
    // https錯誤，全局使用
    const apiErrorStatus = error.response.status
    // 此处全局报错
    if (apiErrorStatus === 403) {
      router.replace('/login')
      removeTokens()
    }
    return Promise.reject(error)
  }
}

export default transform
