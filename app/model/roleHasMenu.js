'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const RoleHasMenu = app.model.define('role_has_menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    roleId: {
      type: INTEGER,
      field: 'role_id',
    },
    menuId: {
      type: INTEGER,
      field: 'menu_id',
    },
    rightType: {
      type: INTEGER,
      field: 'right_type',
    },
  });

  RoleHasMenu.associate = function() {
    app.model.RoleHasMenu.belongsTo(app.model.Menu, { foreignKey: 'menuId', targetKey: 'id', as: 'menuInfo' });
    app.model.RoleHasMenu.belongsTo(app.model.Role, { foreignKey: 'roleId', targetKey: 'id', as: 'menus' });
  }

  return RoleHasMenu;
};