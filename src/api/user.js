import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/me',
    method: 'get'
  })
}

export function password(data) {
  return request({
    url: '/password',
    method: 'put',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'delete'
  })
}
