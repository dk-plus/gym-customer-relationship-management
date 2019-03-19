'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Role = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    roleName: {
      type: STRING(45),
      field: 'role_name',
    },
    createdAt: {
      type: BIGINT,
      field: 'created_at'
    },
    updatedAt: {
      type: BIGINT,
      field: 'updated_at'
    },
    parentId: {
      type: INTEGER,
      field: 'parent_id',
    },
    description: STRING(45),
  });

  Role.associate = function() {
    app.model.Role.hasMany(app.model.UserHasRole, { foreignKey: 'roleId', targetKey: 'id', as: 'roleInfo' });
    app.model.Role.hasMany(app.model.RoleHasMenu, { foreignKey: 'roleId', targetKey: 'id', as: 'menus' });
  }

  return Role;
};