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
    description: STRING(45),
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.UserHasRole, { foreignKey: 'uid', targetKey: 'id', as: 'roles' });
    app.model.User.hasMany(app.model.Member, { foreignKey: 'salesId', targetKey: 'id', as: 'memberInfo' });
  }

  return User;
};