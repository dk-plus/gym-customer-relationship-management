'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
    },
    account: STRING(45),
    password: STRING(45),
    username: STRING(45),
    createdAt: {
      type: BIGINT,
      field: 'created_at'
    },
    updatedAt: {
      type: BIGINT,
      field: 'updated_at'
    },
    phone: INTEGER,
    email: STRING(45),
    bornTime: {
      type: BIGINT,
      field: 'born_time',
    },
    description: STRING(45),
    roleType: {
      type: INTEGER,
      field: 'has_role',
    },
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.UserHasRole, { foreignKey: 'uid', targetKey: 'id', as: 'roles' });
    app.model.User.belongsTo(app.model.Coach, { foreignKey: 'id', targetKey: 'uid', as: 'user' });
  }

  return User;
};