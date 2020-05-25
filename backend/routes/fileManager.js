/**
 * @package		Cronus File Manager
 * @author		Farhad Aliyev Kanni
 * @copyright	Copyright (c) 2011 - 2019, Kannifarhad, Ltd. (http://www.kanni.pro/)
 * @license		https://opensource.org/licenses/GPL-3.0
 * @link		http://filemanager.kanni.pro
**/


const express = require('express');
// 中间件multer: 用于处理 multipart/form-data类型的表单数据，主要用于上传文件
const multer = require('multer');
// 内置模块path
const nodePath = require('path');
// express路由组件
const router = express.Router();
// 导入自定义函数
const {fileManagerController} =  require('../controllers');
// path路径拼接
const coreFolder = nodePath.resolve(__dirname + '/../');
// 临时文件夹
const TMP_PATH = `${coreFolder}/uploads/tmp`;

// 配置multer
const upload = multer({
    dest: `${TMP_PATH}/`,// 上传文件保存路径
    limits: {      // 上传限制
        files: 15, // allow up to 15 files per request,
        fieldSize: 5 * 1024 * 1024 // 5 MB (max file size)
    }
});

// 路径和对应的响应函数
router.post('/foldertree', fileManagerController.folderTree);
router.post('/folder', fileManagerController.folderInfo);
router.post('/all', fileManagerController.all);
router.post('/rename', fileManagerController.rename);
router.post('/createfile', fileManagerController.createfile);
router.post('/createfolder', fileManagerController.createfolder);
router.post('/delete', fileManagerController.delete);
router.post('/copy', fileManagerController.copy);
router.post('/move', fileManagerController.move);
router.post('/emptydir', fileManagerController.emptydir);
router.post('/unzip', fileManagerController.unzip);
router.post('/archive', fileManagerController.archive);
router.post('/duplicate', fileManagerController.duplicate);
router.post('/saveimage', fileManagerController.saveImage);
router.post('/upload', upload.any(), fileManagerController.uploadFiles);

module.exports = router;