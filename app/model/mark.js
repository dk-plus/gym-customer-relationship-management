'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Mark = app.model.define('mark', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    salesId: {
      type: INTEGER,
      field: 'sales_id'
    },
    registerNum: {
      type: BIGINT,
      field: 'register_num'
    },
    registerDate: {
      type: BIGINT,
      field: 'register_date'
    },
    memberNum: {
      type: INTEGER,
      field: 'member_num'
    },
  });

  return Mark;
};