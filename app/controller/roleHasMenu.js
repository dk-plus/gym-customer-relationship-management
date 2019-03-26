const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * RoleHasMenuController
 * roleHasMenu
 */
class RoleHasMenuController extends Controller {
  // 查询全部 GET /roleHasMenu
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.roleHasMenu.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /roleHasMenu/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.roleHasMenu.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /roleHasMenu
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const roleHasMenu = await ctx.service.roleHasMenu.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(roleHasMenu);
  }

  // 更新 PUT /roleHasMenu/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasMenu = await ctx.service.roleHasMenu.findById(id);
    if (!roleHasMenu) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = Date.now();
    await roleHasMenu.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(roleHasMenu);
  }

  // 删除 DELETE /roleHasMenu/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasMenu = await ctx.service.roleHasMenu.findById(id);
    if (!roleHasMenu) {
      ctx.status = 404;
      return;
    }

    await roleHasMenu.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = RoleHasMenuController;