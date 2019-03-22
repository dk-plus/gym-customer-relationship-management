const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * CourseController
 * course
 */
class CourseController extends Controller {
  // 查询全部 GET /course
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.course.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /course/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.course.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /course
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const course = await ctx.service.course.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(course);
  }

  // 更新 PUT /course/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const course = await ctx.service.course.findById(id);
    if (!course) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await course.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(course);
  }

  // 删除 DELETE /course/:id
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
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = CourseController;