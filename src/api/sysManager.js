import axios from './request'
import {
  BASE_URL
} from './config'

/* 部门模块接口 */

export const reqGetDeptTree = params => { // 获取部门树
  return axios.post(`${BASE_URL}/sys/dept/getDeptTree?` + params).then(res => res.data)
}

/* 角色模块接口 */
export const reqAddRole = params => { // 新增角色
  return axios.post(`${BASE_URL}/role/create`, params).then(res => res.data)
}
export const reqDelRole = params => { // 删除角色
  return axios.post(`${BASE_URL}/role/delete?` + params).then(res => res.data)
}
export const reqUpdateRole = params => { // 更新角色
  return axios.post(`${BASE_URL}/role/update`, params).then(res => res.data)
}
export const reqRoleList = params => { // 获取角色列表
  return axios.post(`${BASE_URL}/role/list?` + params).then(res => res.data)
}
