import axios from './request'
import {
  BASE_URL
} from './config'


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

/* 角色模块接口 */
export const reqAddUser = params => { // 新增用户
  return axios.post(`${BASE_URL}/user/create`, params).then(res => res.data)
}
export const reqDelUser = params => { // 删除用户
  return axios.post(`${BASE_URL}/user/delete?` + params).then(res => res.data)
}
export const reqUpdateUser = params => { // 更新用户
  return axios.post(`${BASE_URL}/user/update?` + params).then(res => res.data)
}
export const reqResetUser = params => { // 更新用户
  return axios.post(`${BASE_URL}/user/reset?` + params).then(res => res.data)
}
export const reqUserList = params => { // 获取用户列表
  return axios.post(`${BASE_URL}/user/list?` + params).then(res => res.data)
}
