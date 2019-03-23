'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Coach = app.model.define('coach', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: {
      type: BIGINT,
      field: 'user_id'
    },
  });

  Coach.associate = function() {
    app.model.Coach.hasMany(app.model.Course, { foreignKey: 'coachId', targetKey: 'id', as: 'courseInfo' });
    app.model.Coach.hasOne(app.model.User, { foreignKey: 'id', targetKey: 'uid', as: 'user' });
  }

  return Coach;
};