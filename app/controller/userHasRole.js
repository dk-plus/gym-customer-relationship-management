const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * UserHasRoleController
 * userHasRole
 */
class UserHasRoleController extends Controller {
  // 查询全部 GET /userHasRole
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.userHasRole.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /userHasRole/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.userHasRole.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /userHasRole
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const userHasRole = await ctx.service.userHasRole.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(userHasRole);
  }

  // 更新 PUT /userHasRole/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRole = await ctx.service.userHasRole.findById(id);
    if (!userHasRole) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = Date.now();
    await userHasRole.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(userHasRole);
  }

  // 删除 DELETE /userHasRole/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRole = await ctx.service.userHasRole.findById(id);
    if (!userHasRole) {
      ctx.status = 404;
      return;
    }

    await userHasRole.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = UserHasRoleController;