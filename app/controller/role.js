const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class roleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.role.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.role.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const role = await ctx.service.role.create({ ...rest });
    ctx.status = 201;
    ctx.body = role;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const role = await ctx.service.role.findById(id);
    if (!role) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await role.update({ updatedAt, ...rest });
    ctx.body = role;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const role = await ctx.service.role.findById(id);
    if (!role) {
      ctx.status = 404;
      return;
    }

    await role.destroy();
    ctx.status = 200;
  }
}

module.exports = roleController;