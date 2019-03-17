const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class rightController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.right.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.right.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const right = await ctx.service.right.create({ ...rest });
    ctx.status = 201;
    ctx.body = right;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const right = await ctx.service.right.findById(id);
    if (!right) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await right.update({ updatedAt, ...rest });
    ctx.body = right;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const right = await ctx.service.right.findById(id);
    if (!right) {
      ctx.status = 404;
      return;
    }

    await right.destroy();
    ctx.status = 200;
  }
}

module.exports = rightController;