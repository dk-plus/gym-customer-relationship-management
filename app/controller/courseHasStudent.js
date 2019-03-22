const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * CourseHasStudentController
 * courseHasStudent
 */
class CourseHasStudentController extends Controller {
  // 查询全部 GET /courseHasStudent
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.courseHasStudent.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /courseHasStudent/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.courseHasStudent.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /courseHasStudent
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const courseHasStudent = await ctx.service.courseHasStudent.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(courseHasStudent);
  }

  // 更新 PUT /courseHasStudent/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const courseHasStudent = await ctx.service.courseHasStudent.findById(id);
    if (!courseHasStudent) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await courseHasStudent.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(courseHasStudent);
  }

  // 删除 DELETE /courseHasStudent/:id
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
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = CourseHasStudentController;