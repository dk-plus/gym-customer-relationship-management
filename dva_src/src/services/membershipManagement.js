import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * user
 * deleteMembershipManagement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `&${query}` : '';
  return request(`/user?userType=2${query}`);
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
export function deleteMembershipManagement(id) {
  return deleteData(`/user/${id}`);
}

// 更新
export function updateSalesBatch(args) {
  return postData(`/updateSalesBatch`, args);
}
