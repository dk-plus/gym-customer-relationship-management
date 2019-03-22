const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * UserHasRightController
 * userHasRight
 */
class UserHasRightController extends Controller {
  // 查询全部 GET /userHasRight
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.userHasRight.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /userHasRight/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.userHasRight.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /userHasRight
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const userHasRight = await ctx.service.userHasRight.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(userHasRight);
  }

  // 更新 PUT /userHasRight/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRight = await ctx.service.userHasRight.findById(id);
    if (!userHasRight) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = new Date().valueOf();
    await userHasRight.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(userHasRight);
  }

  // 删除 DELETE /userHasRight/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const userHasRight = await ctx.service.userHasRight.findById(id);
    if (!userHasRight) {
      ctx.status = 404;
      return;
    }

    await userHasRight.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = UserHasRightController;