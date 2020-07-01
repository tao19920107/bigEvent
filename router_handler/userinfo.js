const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息的处理函数
const userinfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic FROM ev_users where id = ?'
    db.query(sql, req.user.id, (err, results) => {
        // 执行sql失败
        if (err) return res.cc(err)
        // sql执行成功,但可能查询为空
        if (results.length !== 1) return res.cc('用户信息获取失败')
        // 用户信息获取成功
        res.send({
            status: 0,
            message: "用户信息获取成功",
            data: results[0]
        })
    })
}

// 用户获取信息处理函数
const updataUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
    })
    return res.cc('用户信息修改成功', 0)
}

// 用户修改密码处理函数
const updatePwd = (req, res) => {
    const sql = 'select * from ev_users where id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1)
            return res.cc('用户不存在！')
        // res.send('ok')
        // 判断旧密码是否正确 true or false
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        // 输入的旧密码与数据库不一致
        console.log(compareResult)
        if (!compareResult) return res.cc('您输入的旧密码有误,请重试!')

        // 旧密码一致,将数据库中的旧密码更改为新密码并加密
        const sql = 'update ev_users set password = ? where id = ?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        console.log(newPwd)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // sql语句执行失败
            if (err) return res.cc(err)
            // sql语句执行成功,但是影响行数不等于1
            if (results.affectedRows !== 1) return res.cc('密码更新失败!')
            // 更新密码成功
            res.cc('密码更新成功!', 0)
        })
    })
}

// 用户修改头像的处理函数
const updateAvatar = (req, res) => {
    console.log(req.body)
    const sql = 'update ev_users set user_pic = ? where id = ?'
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        // sql语句执行失败
        if(err) return res.cc(err)
        // sql语句执行成功,但影响行数不等于1
        if(results.affectedRows !==1) return res.cc('头像修改失败!')
        res.cc('头像修改成功!',0)
    })
}

module.exports = {
    userinfo,
    updataUserInfo,
    updatePwd,
    updateAvatar
}

