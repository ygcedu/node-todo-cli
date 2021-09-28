const db = require('../db.js');

describe('db', () => {
  it('can read', () => {
    expect(db.read instanceof Function).toBe(true);
    fs.writeFileSync('./xxx.json', `[{"title":"hi","done":true}]`);
    db.read('/xxx.json');
  });
  it('can write', () => {
    expect(db.write instanceof Function).toBeTruthy();
  });
});