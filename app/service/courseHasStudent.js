'use strict';

const { Service } = require('egg');

class CourseHasStudent extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    const result = await ctx.model.CourseHasStudent.findAll(query);
    return result;
  }

  async findById(id) {
    const ctx = this.ctx;
    const result = ctx.model.CourseHasStudent.findById(id);
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = new Date().valueOf();
    const updatedAt = new Date().valueOf();
    const result = ctx.model.CourseHasStudent.create({ createdAt, updatedAt, ...rest });
    return result;
  }
}

module.exports = CourseHasStudent;
