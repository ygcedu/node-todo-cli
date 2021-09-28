const db = require('../db.js');
const fs = require('fs');
// 会替代上面真实的 fs
jest.mock('fs');

describe('db', () => {
  it('can read', () => {
    expect(fs.x()).toBe('xxx');
  });
});