const express = require('express') // express module 가져옴
const app = express() // function으로 앱을 만듬
const port = 5000 // 백서버 port 번호

const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')

const config = require('./config/key')

// 만들어 둔 model을 가져옴
const { User } = require("./models/User")

const { auth } = require("./middleware/auth")

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())

app.use(cookieParser())

// mongoDB connect
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))  




// register router start
// 루트에서 hello world를 출력
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// client에서 가져온 회원가입 정보를 데이터베이스에 저장
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})
// register router end

// login router start
app.post('/api/users/login', (req, res) => {
    // 요청된 email을 DB에서 검색
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }

        // 해당 유저가 있다면 비밀번호 검증
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다."
            })

            // 일치한다면 토큰 생성
            user.genToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId: user._id
                })
            })
        })
    })
})
// login router end

// auth router start
app.get('/api/users/auth', auth, (req, res) => {
    // 인증이 된 유저 정보
    res.status(200).json({
        _id: req.user._id,
        isAdimin: req.user.roll === 0 ? false : true, // role 0 : 유저
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})
// auth router end

// logout router start
app.get('/api/users/logout', auth, (req, res) => {
    // 유저를 찾아서 정보를 업데이트
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if(err) return res.json({ success: false, err })

        return res.status(200).send({
            success: true
        })
    })
})
// logout router end



// 포트에서 앱을 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
