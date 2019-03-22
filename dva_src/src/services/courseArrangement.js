import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * courseArrangement
 * deleteCourseArrangement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/courseArrangement/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/courseArrangement/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/courseArrangement/${id}`, args);
}

// 删除
export function deleteCourseArrangement(id) {
  return deleteData(`/courseArrangement/${id}`);
}