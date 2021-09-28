const db = require('../db.js');
const fs = require('fs');
// 会替代上面真实的 fs
jest.mock('fs');

describe('db', () => {
  it('can read', async () => {
    const data = [{title: 'hi', done: true}];
    fs.setReadFileMock('/xxx', null, JSON.stringify(data));
    const list = await db.read('/xxx');
    // 对比对象属性值都相等时使用 toStrictEqual
    expect(list).toStrictEqual(data);
  });
  it('can write', async () => {
    let fakeFile;
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [{title: '看周深演唱会', done: false}, {title: '吃大餐', done: true}];
    await db.write(list, '/yyy');
    expect(fakeFile).toBe(JSON.stringify(list) + '\n');
  });
});