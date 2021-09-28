const db = require('../db.js');
const fs = require('fs');
// 会替代上面真实的 fs
jest.mock('fs');

describe('db', () => {
  it('can read', async () => {
    fs.setMock('/xxx', null, '[]');
    const list = await db.read('./xxx');
    // 对比对象属性值都相等时使用 toStrictEqual
    expect(list).toStrictEqual([]);
  });
});