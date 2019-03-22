'use strict';

const { Service } = require('egg');

class Mark extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    const result = await ctx.model.Mark.findAndCountAll(query);
    return {
      content: result.rows,
      total: result.count,
    };
  }

  async findById(id) {
    const ctx = this.ctx;
    const result = ctx.model.Mark.findById(id);
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = new Date().valueOf();
    const updatedAt = new Date().valueOf();
    const result = ctx.model.Mark.create({ createdAt, updatedAt, ...rest });
    return result;
  }

}

module.exports = Mark;
