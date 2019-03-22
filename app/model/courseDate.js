'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const CourseDate = app.model.define('course_date', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    courseId: {
      type: INTEGER,
      field: 'course_id'
    },
    date: BIGINT,
  });

  return CourseDate;
};