import api from '@/utils/request'

export const getUserActivity = req => {
  return api('post', '/activity/search', req)
}
export const submitActivity = req => {
  return api('post', '/activity/submit', req)
}
export const getActivityDetial = activityId => {
  return api('post', `activity/info/${activityId}`)
}