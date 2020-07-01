const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')
const { add_cate_schema, del_cate_schema, get_cate_schema ,update_cate_schema} = require('../schema/artcate')
const expressJoi = require('@escook/express-joi')
// 获取文章分类列表处理函数
router.get('/cates', artcate_handler.getArticleCates)

// 新增文章分类处理函数
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

// 删除文章分类处理函数
router.get('/deletecate/:id', expressJoi(del_cate_schema), artcate_handler.deleteCateById)
// router.get('/deletecate/:id', artcate_handler.deleteCateById)

// 根据 Id 获取文章分类数据
router.get('/cates/:id',expressJoi(get_cate_schema),artcate_handler.getArticleById)

// 根据 Id 更新文章分类数据
router.post('/updatecate/',expressJoi(update_cate_schema),artcate_handler.updateArticleById)
// updateArticleById  expressJoi(get_cate_schema),
module.exports = router