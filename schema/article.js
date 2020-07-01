const joi = require('@hapi/joi')

// 文章标题
const title = joi.string().required()
// 所属分类 Id
const cate_id = joi.number().integer().min(1).required()
// 文章内容 allow 允许为空
const content = joi.string().required().allow('')

// 状态，可选值为：已发布、草稿
const state = joi.string().valid('已发布', '草稿').required()


module.exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}