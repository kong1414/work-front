import axios from './request'
import {
  BASE_URL
} from './config'


export const reqLogin = params => { // 登陆
  return axios.post(`${BASE_URL}/sys/user/login`, params).then(res => res.data)
}

export const reqQueryAccount = params => { // 远程搜索登陆用户名
  return axios.post(`${BASE_URL}/sys/user/queryList?` + params).then(res => res.data)
}
  