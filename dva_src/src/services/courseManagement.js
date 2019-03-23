import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * course
 * deleteCourseManagement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/course/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/course/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/course/${id}`, args);
}

// 删除
export function deleteCourseManagement(id) {
  return deleteData(`/course/${id}`);
}