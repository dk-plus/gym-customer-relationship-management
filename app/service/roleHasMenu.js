'use strict';

const { Service } = require('egg');

class RoleHasMenu extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    const result = await ctx.model.RoleHasMenu.findAll(query);
    return result;
  }

  async findById(id) {
    const ctx = this.ctx;
    const result = ctx.model.RoleHasMenu.findById(id);
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const result = ctx.model.RoleHasMenu.create({ createdAt, updatedAt, ...rest });
    return result;
  }
}

module.exports = RoleHasMenu;
