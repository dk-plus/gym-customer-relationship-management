const Mock = require('mockjs');

module.exports = {

  [`GET /user`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {
        content: [{
          "id": 1,
          "account": "123456",
          "password": "abc123",
          "username": "bingli",
          "createdAt": 12731849324,
          "updatedAt": 1553086519191,
          "phone": 167213445,
          "email": "12234@qq.com",
          "bornTime": 858873600000,
          "description": "我的名字叫冰粒"
        }, {
          "id": 2,
          "account": "56786",
          "password": "abc123",
          "username": "更好",
          "createdAt": 12731849324,
          "updatedAt": 235345645342,
          "phone": 123456,
          "email": "12234@qq.com",
          "bornTime": 143235465645,
          "description": "asfniqow"
        }],
        total: 2,
      },
    });
  },
}