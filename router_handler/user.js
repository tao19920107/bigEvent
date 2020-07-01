const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

const regUser = (req, res) => {
    let { username, password } = req.body
    // 判断账号密码是否符合要求
    // if (!username || !password) {
    //     return res.cc('用户名或密码不能为空')
    // }
    // 将用户密码加密
    bcrypt.hashSync(password, 10)
    // 判断用户是否存在,数据库中查询
    // 定义sql语句
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, [username], (err, results) => {
        // 执行sql语句失败
        // console.log(results)
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用,请更换其他用户名!'
            })
        }
        password = bcrypt.hashSync(password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username, password }, (err, results) => {
            if (err) {
                return res.send({ status: 1, message: err.message })
            }
            if (results.affectedRows !== 1) {
                return ({
                    status: 1,
                    message: '用户注册失败'
                })
            }
            res.send({
                status: 0,
                message: '用户注册成功'
            })
        })
    })
}

const login = (req, res) => {
    let { username, password } = req.body
    // 查询用户名的sql
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, username, (err, results) => {
        // 执行sql语句失败
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否存在
        if (results.length !== 1) {
            return res.cc('登陆失败')
        }
        // 判断用户输入的登录密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(password, results[0].password)
        // console.log(compareResult)
        if (!compareResult) {
            return res.cc('登录失败')
        }

        // 在服务器端生成token字符串
        const user = { ...results[0], password: '', user_pic: '' }
        // console.log(user);
        // 对用户的信息进行加密,生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        // console.log(tokenStr)
        res.send({
            status: 0,
            message: '登陆成功!',
            token: `Bearer ${tokenStr}`
        })
    })
}

module.exports = {
    regUser,
    login
}
