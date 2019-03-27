'use strict';

const { Service } = require('egg');

class User extends Service {
  // constructor() {}

  async findAll(query) {
    const ctx = this.ctx;
    let userType = query.userType && Number(query.userType);
    if (userType === 1) {
      query = {
        include: [{
          model: this.app.model.UserHasRole,
          as: 'roles',
          include: [{
            model: this.app.model.Role,
            as: 'roleInfo',
            include: [{
              model: this.app.model.RoleHasMenu,
              as: 'menus',
              include: [{
                model: this.app.model.Menu,
                as: 'menuInfo',
              }]
            }]
          }]
        }],
        distinct: true,
        ...query,
      }
    }
    if (userType === 2) {
      query = {
        include: [{
          model: this.app.model.UserHasRole,
          as: 'roles',
          where: {
            roleId: 2, // 会籍人员
          }
        }, {
          model: this.app.model.Member,
          as: 'memberInfo',
        }],
        distinct: true,
        ...query,
      }
    }
    const result = await ctx.model.User.findAndCountAll(query);
    return {
      content: result.rows,
      total: result.count,
    };
  }

  async findById(id) {
    const ctx = this.ctx;
    // const result = ctx.model.User.findById(id);
    const result = await ctx.model.User.findOne({
      include: [{
        model: this.app.model.UserHasRole,
        as: 'roles',
        include: [{
          model: this.app.model.Role,
          as: 'roleInfo',
          include: [{
            model: this.app.model.RoleHasMenu,
            as: 'menus',
            include: [{
              model: this.app.model.Menu,
              as: 'menuInfo',
            }]
          }]
        }]
      }, {
        model: this.app.model.Member,
        as: 'memberInfo',
      }],
      where: {
        id
      },
    });
    return result;
  }

  async create({ ...rest }) {
    const ctx = this.ctx;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const result = ctx.model.User.create({ createdAt, updatedAt, ...rest });
    return result;
  }

  async checkUser(account, password) {
    const ctx = this.ctx;
    const query = { where:{ account } };
    const result = await ctx.model.User.findOne(query);

    if (!result) {
      return ctx.outputError('422', '账号不存在');
    }

    if (result && result.password === password) {

      // 查询用户的角色、菜单
      const userInfo = await ctx.model.User.findOne({
        include: [{
          model: this.app.model.UserHasRole,
          as: 'roles',
          include: [{
            model: this.app.model.Role,
            as: 'roleInfo',
            include: [{
              model: this.app.model.RoleHasMenu,
              as: 'menus',
              include: [{
                model: this.app.model.Menu,
                as: 'menuInfo',
              }]
            }]
          }]
        }],
        where: {
          id: result.id,
        }
      });

      const menuArr = userInfo.roles && userInfo.roles.map(role => {
        return role.roleInfo && role.roleInfo.menus && role.roleInfo.menus.map(menu => menu.menuInfo.menuName)
      });
      const menu = [];
      menuArr.forEach(item => {
        item.forEach(child => menu.push(child))
      });

      return ctx.outputSuccess({
        id: result.id,
        username: result.username,
        menu,
        role: userInfo.roles && userInfo.roles.map(role => role.roleInfo && role.roleInfo.roleName),
      });
    }

    return ctx.outputError('422', '密码错误');
  }
  
  async destroy(id) {
    const ctx = this.ctx;
    // const id = toInt(ctx.params.id);
    const user = await this.findById(id);
    if (!user) {
      return;
    }

    const result = await user.destroy();
    return result;
  }
}

module.exports = User;
