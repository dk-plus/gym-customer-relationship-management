'use strict';

const { Service } = require('egg');

class Menu extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    const result = await ctx.model.Menu.findAll(query);
    return result;
  }

  async findById(id) {
    const ctx = this.ctx;
    const result = ctx.model.Menu.findById(id);
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const result = ctx.model.Menu.create({ createdAt, updatedAt, ...rest });
    return result;
  }
}

module.exports = Menu;
