const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')

// 1.导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 2.导入需要的验证规则对象
const { update_userinfo_schema,update_password_schema,update_updateAvatar_schema} = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.userinfo)

// 更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updataUserInfo)

// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePwd)

// 更换头像
router.post('/update/avatar', expressJoi(update_updateAvatar_schema),userinfo_handler.updateAvatar)
module.exports = router