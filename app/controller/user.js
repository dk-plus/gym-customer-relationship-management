const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * UserController
 * user
 */
class UserController extends Controller {
  // 查询全部 GET /user
  async index() {
    const ctx = this.ctx;
    const { limit, offset, ...rest } = ctx.query;
    
    const { 
      pageSize, pageNo, username, title, sortName,
      createTimeBegin, createTimeEnd, updateTimeBegin, updateTimeEnd, 
      userType,
      ...restQuery 
    } = ctx.query;

    // 动态查询
    const dynamicQuery = {
      ...ctx.parseLikeQuery(`username`, username),
      ...ctx.parseLikeQuery(`title`, title),
      ...ctx.parseBetweenQuery(`createdAt`, createTimeBegin, createTimeEnd),
      ...ctx.parseBetweenQuery(`updatedAt`, updateTimeBegin, updateTimeEnd),
    };
    
    // 查询参数
    const query = { 
      userType,
      ...ctx.parsePageObject(pageSize, pageNo),
      where: { 
        ...dynamicQuery,
        ...restQuery 
      },
      order: sortName && [ctx.parseOrderQuery(sortName)],
    };
    // const query = { limit: toInt(limit), offset: toInt(offset), where: { ...rest } };
    const result = await ctx.service.user.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /user/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.user.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /user
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const user = await ctx.service.user.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(user);
  }

  // 更新 PUT /user/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.service.user.findById(id);
    if (!user) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = Date.now();
    await user.update({ updatedAt, ...rest });
    ctx.body = ctx.outputSuccess(user);
  }

  // 删除 DELETE /user/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.service.user.findById(id);
    const userHasRole = await ctx.service.userHasRole.findOne({ where: { uid: id } });
    if (!user) {
      ctx.status = 404;
      return;
    }

    if (!userHasRole) {
      await user.destroy();
    } else {
      await this.deleteUserAndRole(user.id, userHasRole.id);
    }

    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }

  // 事务
  async deleteUserAndRole(userId, userHasRoleId) {
    const ctx = this.ctx;
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await ctx.service.userHasRole.destroy(userHasRoleId, transaction);
      await ctx.service.user.destroy(userId, transaction);
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
    }
  }

  // 注册
  async register() {
    const { ctx } = this;
    const { request: { body: { account, password } } } = ctx;

    const accountResult = await ctx.service.user.findAll({ where: { account } });
    console.log(account, password, accountResult)
    if (accountResult.total > 0) {
      ctx.body = ctx.outputError('422', '账号已存在，请重试');
      return;
    }
    await this.create();
  }

  // 登录
  async login() {
    const { ctx } = this;
    const { request: { body: { account, password } } } = ctx;

    const result = await ctx.service.user.checkUser(account, password);

    // 校验正确写入session
    if (result.returnCode === '0') {
      ctx.session.userInfo = result.returnValue;
    }

    ctx.body = result;
  }

  // 登出
  async logout() {
    const { ctx } = this;
    ctx.session.userInfo = null;

    ctx.redirect('/login');
  }
}

module.exports = UserController;