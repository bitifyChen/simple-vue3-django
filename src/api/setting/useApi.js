import axios from 'axios'
import transform from './axiosTransform.js'

// create an axios instance
const instance = axios.create({
  baseURL: 'https://b.njlab.website/api_v1/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

// request interceptor
instance.interceptors.request.use(
  (config) => {
    return transform.requestInterceptor(config)
  },
  (error) => {
    return transform.requestInterceptorCatch(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return transform.responseInterceptor(response)
  },
  (error) => {
    return transform.responseInterceptorCatch(error)
  }
)

const request = async (method, url, data, params) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await instance({
      method,
      url,
      data,
      params
    })
    return response
  } catch (error) {
    // throw error
  }
}

export default request
