'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Sales = app.model.define('sales', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: {
      type: BIGINT,
      field: 'user_id'
    },
  });

  return Sales;
};