const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * RoleController
 * role
 */
class RoleController extends Controller {
  // 查询全部 GET /role
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.role.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /role/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.role.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /role
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const role = await ctx.service.role.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(role);
  }

  // 更新 PUT /role/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const role = await ctx.service.role.findById(id);
    if (!role) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await role.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(role);
  }

  // 删除 DELETE /role/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const role = await ctx.service.role.findById(id);
    if (!role) {
      ctx.status = 404;
      return;
    }

    await role.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = RoleController;