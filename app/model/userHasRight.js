'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const UserHasRight = app.model.define('user_has_right', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    rightId: {
      type: INTEGER,
      field: 'right_id',
    },
    uid: {
      type: INTEGER,
      field: 'user_id',
    },
    rightType: {
      type: INTEGER,
      field: 'right_type',
    },
  });

  return UserHasRight;
};