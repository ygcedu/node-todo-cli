const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs');

// 把后面对象的所有 key，都复制到前面对象中
Object.assign(fs, _fs);

const readMocks = {};

fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data];
};

fs.readFile = (path, options, callback) => {
  // 用户只传了两个参数，第二个是回调
  // e.g. fs.readFile('xxxx',fn)
  if (callback === undefined) {
    callback = options;
  }
  if (path in readMocks) {
    // callback(mocks[path][0], mocks[path][1]);
    callback(...readMocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
};

const writeMocks = {};

fs.setWriteFileMock = (path, fn) => {
  writeMocks[path] = fn;
};

fs.writeFile = (path, data, options, callback) => {
  // if (callback === undefined) {
  //   callback = options;
  // }
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback);
  } else {
    _fs.writeFile(path, data, options, callback);
  }
};

module.exports = fs;