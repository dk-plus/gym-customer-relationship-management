'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.home.login);
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.get('/logout', controller.user.logout);
  router.resources('user', '/user', controller.user);

  router.resources('coach', '/coach', controller.coach);
  router.resources('course', '/course', controller.course);
  router.resources('courseHasStudent', '/courseHasStudent', controller.courseHasStudent);
  router.resources('menu', '/menu', controller.menu);
  router.resources('right', '/right', controller.right);
  router.resources('role', '/role', controller.role);
  router.resources('roleHasMenu', '/roleHasMenu', controller.roleHasMenu);
  router.resources('roleHasRight', '/roleHasRight', controller.roleHasRight);
  router.resources('student', '/student', controller.student);
  router.resources('userHasRight', '/userHasRight', controller.userHasRight);
  router.resources('userHasRole', '/userHasRole', controller.userHasRole);
  
  router.get('/*', controller.home.index);
};
