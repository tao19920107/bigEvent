const express = require('express')
const cors = require('cors')
const app = express()
const joi = require('@hapi/joi')

const expressJWT = require('express-jwt')
const config = require('./config')
app.use(cors())
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

app.use('/upload', express.static('./upload'))


// const { UnauthorizedError } = require('express-jwt')



app.use(express.urlencoded({ extended: false }))

// 引用用户登录注册路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 引入获取用户的基本信息模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
// console.dir(expressJWT)
// 引入文章类别管理路由
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

// 引入文章模块
const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)

app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError'){
        return res.cc('身份认证失败!')
    }
    // 未知的错误 
    res.cc(err)
})

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知错误
    res.cc(err)
})



app.listen(3007, () => {
    console.log('success')
})