const Mock = require('mockjs');

// let db = Mock.mock({
//   'data|3-6': [{
//     id: '@id',
//     name: '@name',
//     'age|18-32': 1
//   }]
// });

module.exports = {
  // [`GET /api/users`](req, res) {

  //   res.status(200).json(db);
  // },

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

  // [`GET /user/:id`](req, res) {

  //   res.status(200).json({
  //     errorMessage: '',
  //     returnCode: '0',
  //     returnMessage: 'success',
  //     returnValue: {
  //       "id":1,
  //       "account":"123456",
  //       "password":"abc123",
  //       "username":"bingli",
  //       "createdAt":12731849324,
  //       "updatedAt":235345645342,
  //       "phone":123456,
  //       "email":"12234@qq.com",
  //       "bornTime":143235465645,
  //       "description":"asfniqow"
  //     },
  //   });
  // },
}