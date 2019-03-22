const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * SalesController
 * sales
 */
class SalesController extends Controller {
  // 查询全部 GET /sales
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.sales.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /sales/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.sales.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /sales
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const sales = await ctx.service.sales.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(sales);
  }

  // 更新 PUT /sales/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const sales = await ctx.service.sales.findById(id);
    if (!sales) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await sales.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(sales);
  }

  // 删除 DELETE /sales/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const sales = await ctx.service.sales.findById(id);
    if (!sales) {
      ctx.status = 404;
      return;
    }

    await sales.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = SalesController;