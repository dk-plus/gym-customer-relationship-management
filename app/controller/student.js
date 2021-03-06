const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * StudentController
 * student
 */
class StudentController extends Controller {
  // 查询全部 GET /student
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.student.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /student/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.student.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /student
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const student = await ctx.service.student.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(student);
  }

  // 更新 PUT /student/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const student = await ctx.service.student.findById(id);
    if (!student) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await student.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(student);
  }

  // 删除 DELETE /student/:id
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
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = StudentController;