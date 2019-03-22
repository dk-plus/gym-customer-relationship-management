import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `&${query}` : '';
  return request(`/user/?userType=1&roleType=1${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/user/${id}`);
}

// 创建
export function create(args) {
  return postData('/user', args);
}

// 更新
export function update(id, args) {
  return putData(`/user/${id}`, args);
}

// 创建
export function createUserHasRole(args) {
  return postData(`/userHasRole`, args);
}

// 更新
export function updateUserHasRole(id, args) {
  return putData(`/userHasRole/${id}`, args);
}

// 删除
export function deleteUser(id) {
  return deleteData(`/user/${id}`);
}