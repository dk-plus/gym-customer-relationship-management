const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * CoachController
 * coach
 */
class CoachController extends Controller {
  // 查询全部 GET /coach
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.coach.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /coach/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.coach.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /coach
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const coach = await ctx.service.coach.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(coach);
  }

  // 更新 PUT /coach/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const coach = await ctx.service.coach.findById(id);
    if (!coach) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await coach.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(coach);
  }

  // 删除 DELETE /coach/:id
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
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = CoachController;