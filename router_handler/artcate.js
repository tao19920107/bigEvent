const db = require('../db/index')

// 获取文章分类列表处理函数
const getArticleCates = (req, res) => {
    // res.send('ok')
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql, (err, results) => {
        // sql语句执行失败
        if (err) return res.cc(err)
        // console.log(results)
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: results
        })
    })
}

// 新增文章分类处理函数
const addArticleCates = (req, res) => {
    // 查询文章名称和别名是否被占用
    const sql = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        console.log(results)
        if (err) return res.cc(err)
        // 两条数据分别占用了分类名称,和分类别名
        if (results.length === 2) return res.cc('分类名称与分类别名被占用,请更换!')
        // 一条数据占用了alias和name
        if (results.length === 1 && results[0].alias === req.body.alias && results[0].name === req.body.name) {
            return res.cc('分类名称与分类别名被占用,请更换!')
        }
        // 一条数据占用了name
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc('分类名称被占用,请更换!')
        }
        // 一条数据占用了alias
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('分类别名被占用,请更换!')
        }

        // 未被占用,插入数据
        const sql = 'insert into ev_article_cate (name, alias) values (?,?)'
        db.query(sql, [req.body.name, req.body.alias], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功', 0)
        })
    })
}

// 删除文章分类处理函数
const deleteCateById = (req, res) => {
    // res.send(req.params)
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        console.log(results)
        if (results.affectedRows !== 1) return res.cc('文章分类删除失败!')
        res.cc('文章分类删除成功!', 0)
    })
}

// 根据 Id 获取文章分类数据
const getArticleById = (req, res) => {
    // res.send('ok')
    const sql = 'select * from ev_article_cate where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        // console.log(results)
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        })
    })
}

// 根据 Id 更新文章分类数据
const updateArticleById = (req, res) => {
    const sql = 'select * from ev_article_cate where id <> ? and (name = ? or alias = ?)'
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与分类别名被占用,请更换!')
        // 一条数据占用了alias和name
        if (results.length === 1 && results[0].alias === req.body.alias && results[0].name === req.body.name) {
            return res.cc('分类名称与分类别名被占用,请更换!')
        }
        // 一条数据占用了name
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc('分类名称被占用,请更换!')
        }
        // 一条数据占用了alias
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('分类别名被占用,请更换!')
        }
        // 未被占用,插入数据
        const sql = 'update ev_article_cate set ? where id = ?'
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) res.cc('更新文章分类失败！')
            res.cc('更新文章分类成功！', 0)
        })
    })
}
module.exports = {
    getArticleCates,
    addArticleCates,
    deleteCateById,
    getArticleById,
    updateArticleById
}