const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const p = require('path');
const fs = require('fs');
const dbPath = p.join(home, '.todo');

const db = {
  read(path = dbPath) {
    // 用 Promise 接收异步函数的结果
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error) {
          return reject(error);
        }
        let list;
        try {
          list = JSON.parse(data.toString());
          console.log(list);
        } catch (e) {
          list = [];
        }
        resolve(list);
      });
    });

  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(path, string + '\n', (error) => {
          if (error) {
            // console.log(error);
            return reject(error);
          }
          resolve();
        }
      );
    });
  }
};

module.exports = db;