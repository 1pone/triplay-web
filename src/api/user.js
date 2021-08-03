import api from '@/utils/request'

export const loginApi = data => {
  return api('post', '/user/login', data)
}

export const getUserApi = () => {
  return api('get', '/user/getUserInfo')
}

export const getUserChannel = () => {
  return api('get', '/app/v1_0/user/channels')
}
export const updateUserApi = data => {
  return api('patch', '/app/v1_0/user/profile', data)
}
export const updatePhotoApi = data => {
  return api('patch', '/app/v1_0/user/photo', data)
}

export const addFollow = userId => {
  return api('post', '/app/v1_0/user/followings', {
    target: userId
  })
}

export const deleteFollow = userId => {
  return api('delete', `/app/v1_0/user/followings/${userId}`)
}