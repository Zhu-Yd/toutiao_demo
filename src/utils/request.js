import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://192.168.1.66:8080'
  baseURL: 'https://192.168.1.2',
  // baseURL: 'http://127.0.0.1:3007',
  withCredentials: true
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = store.state.user
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    console.log('用户身份认证失败')
    store.commit('setUser', null)
    router.push('/login')
    // 判断当前请求路径是否为 /layout，如果不是，跳转登录页面。如果是，则刷新页面
    // if (router.currentRoute.path !== '/layout') {
    //   router.push('/login')
    // } else {
    //   window.location.reload()
    // }
  }
  return Promise.reject(error)
})

export default request
