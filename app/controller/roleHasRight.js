const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class roleHasRightController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.roleHasRight.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.roleHasRight.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const roleHasRight = await ctx.service.roleHasRight.create({ ...rest });
    ctx.status = 201;
    ctx.body = roleHasRight;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasRight = await ctx.service.roleHasRight.findById(id);
    if (!roleHasRight) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await roleHasRight.update({ updatedAt, ...rest });
    ctx.body = roleHasRight;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasRight = await ctx.service.roleHasRight.findById(id);
    if (!roleHasRight) {
      ctx.status = 404;
      return;
    }

    await roleHasRight.destroy();
    ctx.status = 200;
  }
}

module.exports = roleHasRightController;