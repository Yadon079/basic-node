const { User } = require('../models/User')

// 인증 처리
let auth = (req, res, next) => {
    // client cookied에서 토큰을 가져옴
    let token = req.cookies.x_auth

    // 토큰 복호화
    User.findeByToken(token, (err, user) => {
        if(err) throw err

        if(!user) return res.json({
            isAuth: false,
            error: true
        })

        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }