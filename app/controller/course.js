const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class courseController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.course.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.course.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const course = await ctx.service.course.create({ ...rest });
    ctx.status = 201;
    ctx.body = course;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const course = await ctx.service.course.findById(id);
    if (!course) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await course.update({ updatedAt, ...rest });
    ctx.body = course;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const course = await ctx.service.course.findById(id);
    if (!course) {
      ctx.status = 404;
      return;
    }

    await course.destroy();
    ctx.status = 200;
  }
}

module.exports = courseController;