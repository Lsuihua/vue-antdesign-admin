/*
  request
 */

import axios from 'axios'
import Router from '@/router'
import {Notify, Toast, Dialog } from 'vant'
import {getCookieToken,removeCookieToken} from '@/utils/auth'
import router from '../router'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const https = axios.create({
  // baseURL:'/wbs/api/', //线上
  baseURL: IS_PROD ? '/' : '/wbs/api', // 切换开发环境
  timeout:100000,
  responseType:'json',
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
})
https.interceptors.request.use(
  config =>{
    Toast.loading({
      duration: 0,
      mask: true,
      // message: '加载中...'
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

https.interceptors.response.use(
  response => {
    // console.log(response)
      Toast.clear()
      if (response.data.flag === 2) {
        Dialog.confirm({
          title: '提示',
          message: '登录超时，是否重新登录？'
        }).then(() => {
          Router.push({path: '/signUp'})
        });
      }else if(response.data.flag !== 1){
          Notify({
              message:response.data.data,
              duration: 1000,
              background: '#fb2c60'
          });
      }
    return response
  },
  error => {
      Toast.clear()
      if(error.data.data){
          Notify({
              message:error.data.data,
              duration: 1000
          });
      }
    return Promise.reject(error)
  }
)

export default https
