'use strict';

const { Service } = require('egg');

class Member extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    const result = await ctx.model.Member.findAndCountAll(query);
    return {
      content: result.rows,
      total: result.count,
    };
  }

  async findById(id) {
    const ctx = this.ctx;
    const result = ctx.model.Member.findById(id);
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const result = ctx.model.Member.create({ createdAt, updatedAt, ...rest });
    return result;
  }
}

module.exports = Member;
