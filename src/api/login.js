import request from '@/utils/request'
import fetch from '@/utils/fetch'
export function loginByUsername(username, password) {
  const data = {
    'username': username,
    'password': password,
    'utype': 1
  }
  return fetch('act=login&op=BeianLogin', data, 'POST')  
}
export function regist(username, password) {
  const data = {
    'username': username,
    'password': password,
    'password_confirm': password,
    'email': username+'@beian.com',
    'client': '',
    'nickname': username,
    'utype': 1,
    'mobile': '',
  }
  return fetch('act=login&op=BeianRegist', data, 'POST')  
}
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

