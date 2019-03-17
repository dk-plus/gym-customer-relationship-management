const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class roleHasMenuController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.roleHasMenu.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.roleHasMenu.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const roleHasMenu = await ctx.service.roleHasMenu.create({ ...rest });
    ctx.status = 201;
    ctx.body = roleHasMenu;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasMenu = await ctx.service.roleHasMenu.findById(id);
    if (!roleHasMenu) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await roleHasMenu.update({ updatedAt, ...rest });
    ctx.body = roleHasMenu;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasMenu = await ctx.service.roleHasMenu.findById(id);
    if (!roleHasMenu) {
      ctx.status = 404;
      return;
    }

    await roleHasMenu.destroy();
    ctx.status = 200;
  }
}

module.exports = roleHasMenuController;