const Mock = require('mockjs');

let member = Mock.mock({
  'data|3-6': [{
    id: '@natural(1,42)',
    username: '@cname',
    'phone|11': '@character("number")',
    'age': '@natural(17,42)',
    'salesId': '@natural(0,100)',
    'sex': '@natural(0,2)',
    createdAt: '@datetime',
    updatedAt: '@datetime',
  }]
});

let user = Mock.mock({
  'data|3-6': [{
    id: '@natural(1,42)',
    username: '@cname',
    'account|11': '@character("number")',
    'phone|11': '@character("number")',
    'password|11': '@character',
    createdAt: '@datetime',
    updatedAt: '@datetime',
    potentialNum: '@natural(0,42)',
    clientNum: '@natural(0,10)',
    "roles": [{
      "id": 2,
      "roleId": 1,
      "uid": 1,
      "roleInfo": {
        "id": 1,
        "roleName": "manager",
        "createdAt": null,
        "updatedAt": null,
        "parentId": null,
        "description": '管理员',
      }
    }]
  }]
});

module.exports = {
  [`GET /member`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {
        content: member.data,
        total: member.data.length
      },
    });
  },

  [`GET /member/:id`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: member.data[0],
    });
  },

  // [`POST /api/users`](req, res) {

  //   let user = req.body;
  //   console.log(req);
  //   user.id = Mock.mock('@id');
  //   db.data.push(user);

  //   res.status(200).json(user);
  // }
  [`POST /login`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {},
    });
  },

  [`POST /register`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {},
    });
  },

  [`GET /logout`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {},
    });
  },

  [`PUT /user/:id`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {},
    });
  },

  [`GET /user`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {
        content: user.data,
        total: user.data.length
      },
    });
  },
  
  [`GET /user/:id`](req, res) {

    res.status(200).json({
      "errorMessage": "",
      "returnCode": "0",
      "returnMessage": "success",
      "returnValue": user.data[0]
    });
  },
}