import request from '@/api/setting/useApi.js'

export const useAboutApi = {
  // 取得列表
  getList: (params) => request('get', '/about', null, params),

  // 新增
  post: (payload) => request('post', '/about/', payload),

  // 更新
  patch: (id, payload) => request('patch', `/about/${id}/`, payload),

  // 取得
  get: (id) => request('get', `/about/${id}`, null),

  // 刪除
  delete: (id) => request('delete', `/about/${id}`, null)
}
