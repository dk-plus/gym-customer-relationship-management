const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * RoleHasRightController
 * roleHasRight
 */
class RoleHasRightController extends Controller {
  // 查询全部 GET /roleHasRight
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.roleHasRight.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /roleHasRight/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.roleHasRight.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /roleHasRight
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const roleHasRight = await ctx.service.roleHasRight.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(roleHasRight);
  }

  // 更新 PUT /roleHasRight/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasRight = await ctx.service.roleHasRight.findById(id);
    if (!roleHasRight) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await roleHasRight.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(roleHasRight);
  }

  // 删除 DELETE /roleHasRight/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const roleHasRight = await ctx.service.roleHasRight.findById(id);
    if (!roleHasRight) {
      ctx.status = 404;
      return;
    }

    await roleHasRight.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = RoleHasRightController;