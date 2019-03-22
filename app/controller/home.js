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
      userInfo: '{}',
    });
  }
}

module.exports = HomeController;
