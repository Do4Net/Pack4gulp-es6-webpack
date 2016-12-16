# Pack4gulp-es6-webpack
打包工具初探 gulp+es6+webpack

工具：
babel： 语法转义
gulp：自动化构建任务 插件 （提供方法 task、 src、pipe、emit、dest）
gulp-jshint、eslint 语法检查
webpack：创建 server 、插件【代码优化、压缩】 、打包（动态识别模块入口【配置入口文件规则】、热加载）
chai：测试驱动开发


node 命令
npm run server 启动服务
npm run babel  进行语法转义
npm run check  js语法检查
npm run test   跑单元测试
npm run webpack 打包
npm run build   完成以上所有任务
