'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Right = app.model.define('right', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    rightName: {
      type: STRING(45),
      field: 'right_name',
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

  return Right;
};