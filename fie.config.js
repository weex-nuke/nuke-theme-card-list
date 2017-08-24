/**
 * 套件帮助文档 可查看: http://gitlab.alibaba-inc.com/fie/fie-toolkit-nuke
 */
module.exports = {
  // 当前项目使用的fie套件
  toolkit: 'fie-toolkit-nb',

  toolkitConfig: {
    // 本地服务器端口号
    // qap开发中客户端需要通过此接口获得qap.json，请不要修改，如果该端口被占用，请修改apache或其他服务配置
    port: 8080,
    // 是否自动打开浏览器
    open: true,
    // 文件修改后是否自动刷新浏览器
    liveload: true,
    path: {
      simple: '',
    },
  },
  tasks: {
    commit: [
      {
        command: './node_modules/eslint/bin/eslint.js --fix ./ --ext .jsx --ext .js',
      }, {
        command: 'fie plugin commit',
      },
    ],
  },
};
