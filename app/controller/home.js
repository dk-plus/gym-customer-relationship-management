'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { userInfo } = ctx;

    if (!userInfo) {
      ctx.redirect('/login');
      return;
    }

    // let result = await this.app.model.User.findAll({
    //   include: [{
    //     model: this.app.model.UserHasRole,
    //     as: 'roles',
    //     include: [{
    //       model: this.app.model.Role,
    //       as: 'roleInfo',
    //       include: [{
    //         model: this.app.model.RoleHasMenu,
    //         as: 'menus',
    //         include: [{
    //           model: this.app.model.Menu,
    //           as: 'menuInfo',
    //         }]
    //       }]
    //     }]
    //   }],
    // });

    // ctx.body = JSON.stringify(result, {}, 2);
    // return;

    // console.log(userInfo)
    await ctx.render('home.tpl', {
      title: '健身房企业规范化化管理系统',
      userInfo: JSON.stringify(userInfo),
    });
  }

  async login() {
    const { ctx } = this;
    await ctx.render('home.tpl', {
      title: '登录',
    });
  }
}

module.exports = HomeController;
