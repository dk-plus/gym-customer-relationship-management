const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.user.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const user = await ctx.service.user.create({...rest});
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.service.user.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await user.update({ updatedAt, ...rest });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.service.user.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }

  async login() {
    const { ctx } = this;
    const { request: { body: { user, pwd } } } = ctx;

    const result = await ctx.service.user.checkUser(user, pwd);

    if (result.code === 200) {
      ctx.session.userInfo = {
        user,
        pwd
      };

      // ctx.redirect('/');
      ctx.body = {
        code: 200,
        msg: 'hello'
      }
    } else {
      ctx.body = {
        data: ctx.request.body,
        result: result
      }
    }
  }

  async logout() {
    const { ctx } = this;
    ctx.session.userInfo = null;

    ctx.redirect('/login');
  }
}

module.exports = UserController;