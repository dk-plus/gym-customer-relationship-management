'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const CourseHasStudent = app.model.define('course_has_student', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    courseId: {
      type: INTEGER,
      field: 'course_id',
    },
    studentId: {
      type: INTEGER,
      field: 'student_id',
    },
  });

  return CourseHasStudent;
};