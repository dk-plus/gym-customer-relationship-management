const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/controller/right.test.js', () => {
  describe('GET /right', () => {
    it('should status 200 and get the body', () => {
      // 对 app 发起 `GET /` 请求
      return app.httpRequest()
        .get('/right')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200) // 期望返回 status 200
    });

    it('should status 200 and get the body limited 5 offset 1', () => {
      // 对 app 发起 `GET /` 请求
      return app.httpRequest()
        .get('/right')
        .query({
          limit: 5,
          offset: 1,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200) // 期望返回 status 200
    });
  });

  describe('POST /right', () => {
    it('should status 201 and get the body', () => {
      // 对 app 发起 `GET /` 请求
      return app.httpRequest()
        .post('/right')
        .send({
          "parentId": 1,
          "rightName": `test_${new Date().valueOf().toString().slice(-4)}`,
          "createdAt": new Date().valueOf(),
          "updatedAt": new Date().valueOf(),
          "description": "这是测试描述"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
    });
  });
});