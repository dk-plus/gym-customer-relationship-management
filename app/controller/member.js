const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * MemberController
 * member
 */
class MemberController extends Controller {
  // 查询全部 GET /member
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
    const result = await ctx.service.member.findAll(query);
    ctx.body = ctx.outputSuccess(result);
  }

  // 查询id GET /member/:id
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.member.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(result);
  }

  // 创建 POST /member
  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const member = await ctx.service.member.create({...rest});
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(member);
  }

  // 更新 PUT /member/:id
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const member = await ctx.service.member.findById(id);
    if (!member) {
      ctx.status = 404;
      // ctx.outputError('404', '账号不存在');
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = Date.now();
    try {
      await member.update({ updatedAt, ...rest });
    } catch (error) {
      ctx.body = ctx.outputError('500', `${error.name}: ${JSON.stringify(error.fields)}`);
      return;
    }
    ctx.body = ctx.outputSuccess(member);
  }

  // 批量更新所属销售
  async updateSalesBatch() {
    const ctx = this.ctx;
    const ids = ctx.request.body.ids;
    const salesId = toInt(ctx.request.body.salesId);
    let idArr = ids.split(',');

    idArr = idArr.map(id => toInt(id));
    const updatedAt = Date.now();

    const result = await ctx.model.Member.update({ updatedAt, salesId: toInt(salesId) }, { where: { id: { $in: idArr } } });
    ctx.body = ctx.outputSuccess(result);
  }

  // 删除 DELETE /member/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const member = await ctx.service.member.findById(id);
    if (!member) {
      ctx.status = 404;
      return;
    }

    await member.destroy();
    ctx.status = 200;
    ctx.body = ctx.outputSuccess(true);
  }
}

module.exports = MemberController;