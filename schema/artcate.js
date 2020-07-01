
const joi = require('@hapi/joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义删除 获取文章分类的 id 的校验规则
const id = joi.number().integer().min(1).required()

module.exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}
module.exports.del_cate_schema = {
    params: {
        id
    }
}
module.exports.get_cate_schema = {
    params: {
        id
    }
}
module.exports.update_cate_schema = {
    body: {
        id:id,
        name,
        alias
    }
}