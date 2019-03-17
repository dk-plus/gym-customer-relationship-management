const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class studentController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.student.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.student.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const student = await ctx.service.student.create({ ...rest });
    ctx.status = 201;
    ctx.body = student;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const student = await ctx.service.student.findById(id);
    if (!student) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await student.update({ updatedAt, ...rest });
    ctx.body = student;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const student = await ctx.service.student.findById(id);
    if (!student) {
      ctx.status = 404;
      return;
    }

    await student.destroy();
    ctx.status = 200;
  }
}

module.exports = studentController;