import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

export function register(args) {
  return postData('/register', args);
}

export function login(args) {
  return postData('/login', args);
}

export function logout(args) {
  return postData('/logout', args);
}

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/user/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/user/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/user/${id}`, args);
}

// 删除
export function deleteUser(id) {
  return deleteData(`/user/${id}`);
}