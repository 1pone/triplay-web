import api from '@/utils/request'

export const getUserActivity = req => {
  return api('post', '/activity/search', req)
}