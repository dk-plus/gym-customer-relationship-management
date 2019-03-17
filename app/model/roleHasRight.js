'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const RoleHasRight = app.model.define('role_has_right', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    rightId: {
      type: INTEGER,
      field: 'right_id',
    },
    roleId: {
      type: INTEGER,
      field: 'role_id',
    },
    rightType: {
      type: INTEGER,
      field: 'right_type',
    },
  });

  return RoleHasRight;
};