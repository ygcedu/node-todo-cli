const db = require('./db.js');
const inquirer = require('inquirer');

module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read();
  // 往里面添加一个 title 任务
  list.push({title, done: false});
  // 存储任务到文件
  await db.write(list);
};

module.exports.clear = async (title) => {
  await db.write([]);
};

module.exports.showAll = async () => {
  // 读取之前的任务
  const list = await db.read();
  // 打印之前的任务
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择你想要的任务',
    choices: list.map((task, index) => {
      return {
        name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`,
        value: index
      };
    })
  }).then(answer => {
    console.log(answer.index);
  });
};

