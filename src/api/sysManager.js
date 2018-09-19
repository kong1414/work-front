import axios from './request'
import {
  BASE_URL
} from './config'

/* 部门模块接口 */

export const reqGetDeptTree = params => { // 获取部门树
  return axios.post(`${BASE_URL}/sys/dept/getDeptTree?` + params).then(res => res.data)
}
