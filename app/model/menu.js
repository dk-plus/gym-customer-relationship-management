'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Menu = app.model.define('menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    menuName: {
      type: STRING(45),
      field: 'menu_name',
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

  return Menu;
};