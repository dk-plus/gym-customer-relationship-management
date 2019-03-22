import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * user
 * deleteCoachManagement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `&${query}` : '';
  return request(`/user/?userType=2&roleType=1${query}`);
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
export function deleteCoachManagement(id) {
  return deleteData(`/user/${id}`);
}