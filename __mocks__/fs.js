const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs');

// 把后面对象的所有 key，都复制到前面对象中
Object.assign(fs, _fs);

const mocks = {};

fs.setMock = (path, error, data) => {
  mocks[path] = [error, data];
};


fs.readFile = (path, options, callback) => {
  // 用户只传了两个参数，第二个是回调
  // e.g. fs.readFile('xxxx',fn)
  if (callback === undefined) {
    callback = options;
  }
  if (path in mocks) {
    // callback(mocks[path][0], mocks[path][1]);
    callback(...mocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
};

module.exports = fs;