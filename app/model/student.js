'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Student = app.model.define('student', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: {
      type: BIGINT,
      field: 'user_id'
    },
  });

  return Student;
};