const stateData = {
  list: [],
  detail: {},
};

export default {

  namespace: 'index',

  state: {
    ...stateData
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    // 初始化
    *initState({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {...stateData} });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
