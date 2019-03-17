const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class coachController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.coach.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.coach.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const coach = await ctx.service.coach.create({ ...rest });
    ctx.status = 201;
    ctx.body = coach;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const coach = await ctx.service.coach.findById(id);
    if (!coach) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await coach.update({ updatedAt, ...rest });
    ctx.body = coach;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const coach = await ctx.service.coach.findById(id);
    if (!coach) {
      ctx.status = 404;
      return;
    }

    await coach.destroy();
    ctx.status = 200;
  }
}

module.exports = coachController;