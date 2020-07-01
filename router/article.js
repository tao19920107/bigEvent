const express = require('express')
const router = express()
const expressJoi = require('@escook/express-joi')
const article_handler = require('../router_handler/article')
const { add_article_schema } = require('../schema/article')
// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据
const multer = require('multer')
const path = require('path')
// var upload = multer({ dest: 'uploads/' })
const upload = multer({ dest: path.join(__dirname, '../upload') })

router.post('/add', [upload.single('cover_img'), expressJoi(add_article_schema)], article_handler.addArticle)

module.exports = router