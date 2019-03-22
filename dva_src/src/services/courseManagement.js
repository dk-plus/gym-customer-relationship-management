import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * courseManagement
 * deleteCourseManagement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/courseManagement/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/courseManagement/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/courseManagement/${id}`, args);
}

// 删除
export function deleteCourseManagement(id) {
  return deleteData(`/courseManagement/${id}`);
}