'use strict';

const { Service } = require('egg');

class RoleHasRight extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    const result = await ctx.model.RoleHasRight.findAll(query);
    return result;
  }

  async findById(id) {
    const ctx = this.ctx;
    const result = ctx.model.RoleHasRight.findById(id);
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = new Date().valueOf();
    const updatedAt = new Date().valueOf();
    const result = ctx.model.RoleHasRight.create({ createdAt, updatedAt, ...rest });
    return result;
  }
}

module.exports = RoleHasRight;
