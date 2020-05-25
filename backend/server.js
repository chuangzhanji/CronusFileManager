/**
 * @package		Cronus File Manager
 * @author		Farhad Aliyev Kanni
 * @copyright	Copyright (c) 2011 - 2019, Kannifarhad, Ltd. (http://www.kanni.pro/)
 * @license		https://opensource.org/licenses/GPL-3.0
 * @link		http://filemanager.kanni.pro
**/

// 后端框架express
const express = require('express');
// 中间件cors: 跨源响应
const cors = require('cors');
// 中间件xss-clean: 预防xss攻击的，已弃用
const xss = require('xss-clean');
// 中间件express-rate-limit: 请求限制
const rateLimit = require('express-rate-limit');
// 中间件body-parser: 请求体解析
const bodyParser = require('body-parser');

// 实例化express应用
const app = express();
const port = 3131

// 错误类
const AppError = require('./utilits/appError');
// 错误处理中间件
const globalErrorHandler = require('./controllers/errorController');

// 子路由
var fileManager = require('./routes/fileManager');

// 全局启用cors中间件
app.use(cors());
// 全局启用body-parser中间件，并配置参数；一个json数据解析器、一个urlencoded解析器
app.use(bodyParser.json({limit: '10mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  })
);
// 全局启用xss-clean中间件
app.use(xss());
// 支持反向代理
app.set('trust proxy', 1);

// express-rate-limit配置和使用
const limiter = rateLimit({
  max: 1000,               // 每个ip 1000次
  windowMs: 1 * 60 * 1000, // 1分钟时间内
  message: new AppError(`Too many requests from this IP, please try again in an 1 minutes`, 429)  // 错误信息
});
app.use('*', limiter);

// 配置路由
app.use('/admin/fm', fileManager);
// 配置本地静态文件夹
app.use('/admin/uploads', express.static(__dirname + '/uploads'));

// 对未正确处理的路由进行报错，next传参？？？
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 最后的错误处理
app.use(globalErrorHandler);

// 启用express服务
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});