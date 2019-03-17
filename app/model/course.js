'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Course = app.model.define('course', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    courseName: {
      type: STRING(45),
      field: 'course_name',
    },
    coachId: {
      type: INTEGER,
      field: 'coach_id',
    },
    description: STRING(45),
  });

  return Course;
};