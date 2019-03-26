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

  router.resources('menu', '/menu', controller.menu);
  router.resources('role', '/role', controller.role);
  router.resources('roleHasMenu', '/roleHasMenu', controller.roleHasMenu);
  router.resources('userHasRole', '/userHasRole', controller.userHasRole);
  router.resources('member', '/member', controller.member);
  
  router.post('/updateSalesBatch', controller.member.updateSalesBatch);
  
  router.get('/*', controller.home.index);
};
