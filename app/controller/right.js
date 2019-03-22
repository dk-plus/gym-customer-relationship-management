const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * RightController
 * right
 */
class RightController extends Controller {
  // 查询全部 GET /right
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.right.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /right/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.right.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /right
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const right = await ctx.service.right.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(right);
  }

  // 更新 PUT /right/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const right = await ctx.service.right.findById(id);
    if (!right) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await right.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(right);
  }

  // 删除 DELETE /right/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const right = await ctx.service.right.findById(id);
    if (!right) {
      ctx.status = 404;
      return;
    }

    await right.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = RightController;