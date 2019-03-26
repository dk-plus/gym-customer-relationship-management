'use strict';

const { Service } = require('egg');

class UserHasRole extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    const result = await ctx.model.UserHasRole.findAll(query);
    return result;
  }

  async findOne(query) {
    const ctx = this.ctx;
    const result = await ctx.model.UserHasRole.findOne(query);
    return result;
  }

  async findById(id) {
    const ctx = this.ctx;
    const result = await ctx.model.UserHasRole.findById(id);
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const result = await ctx.model.UserHasRole.create({ createdAt, updatedAt, ...rest });
    return result;
  }
  
  async destroy(id) {
    const ctx = this.ctx;
    // const id = toInt(ctx.params.id);
    const userHasRole = await this.findById(id);
    if (!userHasRole) {
      return;
    }

    const result = await userHasRole.destroy();
    return result;
  }
}

module.exports = UserHasRole;
