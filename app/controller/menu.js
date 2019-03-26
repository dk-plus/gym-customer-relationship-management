const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * MenuController
 * menu
 */
class MenuController extends Controller {
  // 查询全部 GET /menu
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.menu.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /menu/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.menu.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /menu
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const menu = await ctx.service.menu.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(menu);
  }

  // 更新 PUT /menu/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const menu = await ctx.service.menu.findById(id);
    if (!menu) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = Date.now();
    await menu.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(menu);
  }

  // 删除 DELETE /menu/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const menu = await ctx.service.menu.findById(id);
    if (!menu) {
      ctx.status = 404;
      return;
    }

    await menu.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = MenuController;