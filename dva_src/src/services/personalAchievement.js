import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

/**
 * personalAchievement
 * deletePersonalAchievement
 */

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/personalAchievement/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/personalAchievement/${id}`);
}

// 更新
export function update(id, args) {
  return putData(`/personalAchievement/${id}`, args);
}

// 删除
export function deletePersonalAchievement(id) {
  return deleteData(`/personalAchievement/${id}`);
}