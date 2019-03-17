'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Coach = app.model.define('coach', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: {
      type: BIGINT,
      field: 'user_id'
    },
  });

  return Coach;
};