const express = require('express') // express module 가져옴
const app = express() // function으로 앱을 만듬
const port = 5000 // 백서버 port 번호

// 루트에서 hello world를 출력
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 포트에서 앱을 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})