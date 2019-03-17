const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class courseHasStudentController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    ctx.body = await ctx.service.courseHasStudent.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.courseHasStudent.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const courseHasStudent = await ctx.service.courseHasStudent.create({ ...rest });
    ctx.status = 201;
    ctx.body = courseHasStudent;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const courseHasStudent = await ctx.service.courseHasStudent.findById(id);
    if (!courseHasStudent) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await courseHasStudent.update({ updatedAt, ...rest });
    ctx.body = courseHasStudent;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const courseHasStudent = await ctx.service.courseHasStudent.findById(id);
    if (!courseHasStudent) {
      ctx.status = 404;
      return;
    }

    await courseHasStudent.destroy();
    ctx.status = 200;
  }
}

module.exports = courseHasStudentController;