import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * totalAchievement
 * deleteTotalAchievement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/totalAchievement/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/totalAchievement/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/totalAchievement/${id}`, args);
}

// 删除
export function deleteTotalAchievement(id) {
  return deleteData(`/totalAchievement/${id}`);
}