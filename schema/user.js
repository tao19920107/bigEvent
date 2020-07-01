const joi = require('@hapi/joi')

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 用户头像校验规则
const avatar = joi.string().dataUri().required()

//-------------------------------
//更新
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

module.exports.reg_login_schema = {
    body: {
        username,
        password,
    }
}

module.exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

module.exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
        //   newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}


module.exports.update_updateAvatar_schema = {
    body: {
        avatar
    }
}

// console.log(module.exports)


