// module 가져옴
const mongoose = require('mongoose');

// schema 생성
const userSchema = mongoose.Schema({
    // 필드 작성
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 빈칸 제거
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 스키마를 감싸는 모델
const User = mongoose.model('User', userSchema)

// 다른 파일에서도 쓰기위한 설정
module.exports = { User }