import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * coach
 * deleteCoachManagement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/coach${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/coach/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/coach/${id}`, args);
}

// 删除
export function deleteCoachManagement(id) {
  return deleteData(`/coach/${id}`);
}