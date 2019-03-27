import * as userService from '../services/user';
import { queryToCommom } from '../utils/utils';

const stateData = {
  list: [],
  detail: {},
};

export default {

  namespace: 'user',

  state: {
    ...stateData,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    // 初始化
    *initState({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { ...stateData } });
    },

    // 查询
    *fetch({ payload: { params } }, { call, put }) {  // eslint-disable-line
      params = params || {};

      const data = {
        list: [],
      };
      const options = {
        ...queryToCommom(params)
      };
      const result = yield call(userService.getList, options);

      if (result && result.returnCode === '0' && result.returnValue) {
        data.list = result.returnValue.content;
        data.total = result.returnValue.total;
      }
      yield put({ type: 'save', payload: data });

      return result;
    },

    // 查询id
    *getDetail({ payload }, { call, put }) {  // eslint-disable-line
      const data = {
        detail: {},
      };
      const result = yield call(userService.getDetail, payload);
      if (result && result.returnCode === '0' && result.returnValue) {
        data.detail = result.returnValue;
      }
      yield put({ type: 'save', payload: data });

      return result;
    },

    // 注册
    *register({ payload }, { call, put }) {
      const result = yield call(userService.register, payload);
      return result;
    },

    // 登录
    *login({ payload }, { call, put }) {
      const result = yield call(userService.login, payload);
      return result;
    },

    // 登出
    *logout({ payload }, { call, put }) {
      const result = yield call(userService.logout, payload);
      return result;
    },

    // 更新
    *update({ payload: { id, params } }, { call, put }) {  // eslint-disable-line
      params = params || {};

      const result = yield call(userService.update, id, params);
      return result;
    },

    // 更新状态
    *updateStatus({ payload }, { call, put }) {  // eslint-disable-line
      const options = {
        status: payload.status
      };

      const result = yield call(userService.update, payload.id, options);
      return result;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

};
