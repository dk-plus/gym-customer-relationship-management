const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class userHasRightController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.userHasRight.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.userHasRight.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const userHasRight = await ctx.service.userHasRight.create({ ...rest });
    ctx.status = 201;
    ctx.body = userHasRight;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRight = await ctx.service.userHasRight.findById(id);
    if (!userHasRight) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await userHasRight.update({ updatedAt, ...rest });
    ctx.body = userHasRight;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRight = await ctx.service.userHasRight.findById(id);
    if (!userHasRight) {
      ctx.status = 404;
      return;
    }

    await userHasRight.destroy();
    ctx.status = 200;
  }
}

module.exports = userHasRightController;