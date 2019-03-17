const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/controller/user.test.js', () => {
  describe('GET /user', () => {
    it('should status 200 and get the body', () => {
      // 对 app 发起 `GET /` 请求
      return app.httpRequest()
        .get('/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200) // 期望返回 status 200
    });

    it('should status 200 and get the body limited 5 offset 1', () => {
      // 对 app 发起 `GET /` 请求
      return app.httpRequest()
        .get('/user')
        .query({
          limit: 5,
          offset: 1,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200) // 期望返回 status 200
    });

    // it('should send multi requests', async () => {
    //   // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
    //   await app.httpRequest()
    //     .get('/user')
    //     .expect(200) // 期望返回 status 200

    //   // 再请求一次
    //   const result = await app.httpRequest()
    //     .get('/user')
    //     .expect(200)

    //   // 也可以这样验证
    //   assert(result.status === 200);
    // });
  });

  describe('POST /user', () => {
    it('should status 201 and get the body', () => {
      // 对 app 发起 `GET /` 请求
      return app.httpRequest()
        .post('/user')
        .send({
          "account": new Date().valueOf().toString().slice(- 7),
          "password": "abc123",
          "username": "bingli",
          "createdAt": new Date().valueOf(),
          "updatedAt": new Date().valueOf(),
          "phone": Math.floor((Math.random()+1)*10000000000),
          "email": `${Math.floor((Math.random()+1)*10000)}@qq.com`,
          "bornTime": new Date('1997-06-02').valueOf(),
          "description": "这是描述"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
    });
  });
});