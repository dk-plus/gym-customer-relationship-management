const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class menuController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.menu.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.menu.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const menu = await ctx.service.menu.create({ ...rest });
    ctx.status = 201;
    ctx.body = menu;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const menu = await ctx.service.menu.findById(id);
    if (!menu) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await menu.update({ updatedAt, ...rest });
    ctx.body = menu;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const menu = await ctx.service.menu.findById(id);
    if (!menu) {
      ctx.status = 404;
      return;
    }

    await menu.destroy();
    ctx.status = 200;
  }
}

module.exports = menuController;