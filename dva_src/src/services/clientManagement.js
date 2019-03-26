import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * member
 * deletePotentialClient
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `&${query}` : '';
  return request(`/member?isMember=1${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/member/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/member/${id}`, args);
}

// 删除
export function deleteClient(id) {
  return deleteData(`/member/${id}`);
}