'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Member = app.model.define('member', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    phone: INTEGER,
    signature: STRING(45),
    salesId: {
      type: BIGINT,
      field: 'sales_id'
    },
    isMember: {
      type: BIGINT,
      field: 'is_member'
    },
    sex: INTEGER,
    username: STRING(45),
    height: INTEGER,
    weight: INTEGER,
    age: INTEGER,
    createdAt: {
      type: BIGINT,
      field: 'created_at'
    },
    updatedAt: {
      type: BIGINT,
      field: 'updated_at'
    },
  });

  Member.associate = function() {
    app.model.Member.belongsTo(app.model.User, { foreignKey: 'salesId', targetKey: 'id', as: 'memberInfo' });
  }

  return Member;
};