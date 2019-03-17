const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class userHasRoleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.userHasRole.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.userHasRole.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const userHasRole = await ctx.service.userHasRole.create({ ...rest });
    ctx.status = 201;
    ctx.body = userHasRole;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRole = await ctx.service.userHasRole.findById(id);
    if (!userHasRole) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await userHasRole.update({ updatedAt, ...rest });
    ctx.body = userHasRole;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRole = await ctx.service.userHasRole.findById(id);
    if (!userHasRole) {
      ctx.status = 404;
      return;
    }

    await userHasRole.destroy();
    ctx.status = 200;
  }
}

module.exports = userHasRoleController;