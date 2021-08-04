import api from '@/utils/request'

export const getLabelPage = (page, limit) => {
  return api('get', `/label/list?page=${page}&limit=${limit}`)
}

export const saveUserLabel = (labelList) => {
  return api('post', '/userlabel/save', labelList)
}

export const getUserLabel = userId => {
  return api('get', `/user/getUserLabel/?userId=${userId}`)
}