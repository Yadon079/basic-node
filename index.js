const express = require('express') // express module 가져옴
const app = express() // function으로 앱을 만듬
const port = 5000 // 백서버 port 번호

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

// 포트에서 앱을 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
