const express = require('express') // express module 가져옴
const app = express() // function으로 앱을 만듬
const port = 5000 // 백서버 port 번호

const bodyParser = require('body-parser')

// 만들어 둔 model을 가져옴
const { User } = require("./models/User")

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())

// mongoDB connect
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://gracenam:abcd1234@basic-node.olyns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))  






// 루트에서 hello world를 출력
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// client에서 가져온 회원가입 정보를 데이터베이스에 저장
app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})


// 포트에서 앱을 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
