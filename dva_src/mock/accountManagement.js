// const Mock = require('mockjs');

// module.exports = {

//   [`GET /user`](req, res) {

//     res.status(200).json({
//       errorMessage: '',
//       returnCode: '0',
//       returnMessage: 'success',
//       returnValue: {
//         content: [{
//           "id": 1,
//           "account": "123456",
//           "password": "abc123",
//           "username": "bingli",
//           "createdAt": 12731849324,
//           "updatedAt": 1553086519191,
//           "phone": 167213445,
//           "email": "12234@qq.com",
//           "bornTime": 858873600000,
//           "description": "我的名字叫冰粒"
//         }, {
//           "id": 2,
//           "account": "56786",
//           "password": "abc123",
//           "username": "更好",
//           "createdAt": 12731849324,
//           "updatedAt": 235345645342,
//           "phone": 123456,
//           "email": "12234@qq.com",
//           "bornTime": 143235465645,
//           "description": "asfniqow"
//         }, {
//           "id": 3,
//           "account": "123456",
//           "password": "abc123",
//           "username": "bingli",
//           "createdAt": 12731849324,
//           "updatedAt": 1553086519191,
//           "phone": 167213445,
//           "email": "12234@qq.com",
//           "bornTime": 858873600000,
//           "description": "我的名字叫冰粒",
//           "roleType": 0,
//           "roles": [{
//             "id": 2,
//             "roleId": 1,
//             "uid": 1,
//             "roleInfo": {
//               "id": 1,
//               "roleName": "manager",
//               "createdAt": null,
//               "updatedAt": null,
//               "parentId": null,
//               "description": "管理员",
//             }
//           }, {
//             "id": 3,
//             "roleId": 1,
//             "uid": 1,
//             "roleInfo": {
//               "id": 1,
//               "roleName": "manager",
//               "createdAt": null,
//               "updatedAt": null,
//               "parentId": null,
//               "description": "管理员1",
//             }
//           }]
//         }],
//         total: 2,
//       },
//     });
//   },

  
//   [`GET /user/:id`](req, res) {

//     res.status(200).json({
//       "errorMessage": "",
//       "returnCode": "0",
//       "returnMessage": "success",
//       "returnValue": {
//         "id": 1,
//         "account": "123456",
//         "password": "abc123",
//         "username": "bingli",
//         "createdAt": 12731849324,
//         "updatedAt": 1553086519191,
//         "phone": 167213445,
//         "email": "12234@qq.com",
//         "bornTime": 858873600000,
//         "description": "我的名字叫冰粒",
//         "roleType": 0,
//         // "roles": [{
//         //   "id": 2,
//         //   "roleId": 1,
//         //   "uid": 1,
//         //   "roleInfo": {
//         //     "id": 1,
//         //     "roleName": "manager",
//         //     "createdAt": null,
//         //     "updatedAt": null,
//         //     "parentId": null,
//         //     "description": "管理员",
//         //     "menus": [{
//         //       "id": 1,
//         //       "roleId": 1,
//         //       "menuId": 1,
//         //       "rightType": 1,
//         //       "menuInfo": {
//         //         "id": 1,
//         //         "menuName": "total_achievement",
//         //         "createdAt": null,
//         //         "updatedAt": null,
//         //         "parentId": null,
//         //         "description": "总体销售业绩"
//         //       }
//         //     }]
//         //   }
//         // }]
//       }
//     });
//   },
// }