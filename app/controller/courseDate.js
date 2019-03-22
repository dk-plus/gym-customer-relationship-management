const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * CourseDateController
 * courseDate
 */
class CourseDateController extends Controller {
  // 查询全部 GET /courseDate
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.courseDate.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /courseDate/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.courseDate.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /courseDate
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const courseDate = await ctx.service.courseDate.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(courseDate);
  }

  // 更新 PUT /courseDate/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const courseDate = await ctx.service.courseDate.findById(id);
    if (!courseDate) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await courseDate.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(courseDate);
  }

  // 删除 DELETE /courseDate/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const courseDate = await ctx.service.courseDate.findById(id);
    if (!courseDate) {
      ctx.status = 404;
      return;
    }

    await courseDate.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = CourseDateController;