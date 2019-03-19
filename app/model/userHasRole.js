'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const UserHasRole = app.model.define('user_has_role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    roleId: {
      type: INTEGER,
      field: 'role_id',
    },
    uid: {
      type: INTEGER,
      field: 'user_id',
    },
  });

  UserHasRole.associate = function() {
    app.model.UserHasRole.belongsTo(app.model.User, { foreignKey: 'uid', targetKey: 'id', as: 'roles' });
    app.model.UserHasRole.belongsTo(app.model.Role, { foreignKey: 'roleId', targetKey: 'id', as: 'roleInfo' });
  }

  return UserHasRole;
};