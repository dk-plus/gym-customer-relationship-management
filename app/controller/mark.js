const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * MarkController
 * mark
 */
class MarkController extends Controller {
  // 查询全部 GET /mark
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.mark.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /mark/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.mark.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /mark
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const mark = await ctx.service.mark.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(mark);
  }

  // 更新 PUT /mark/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const mark = await ctx.service.mark.findById(id);
    if (!mark) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await mark.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(mark);
  }

  // 删除 DELETE /mark/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const mark = await ctx.service.mark.findById(id);
    if (!mark) {
      ctx.status = 404;
      return;
    }

    await mark.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = MarkController;