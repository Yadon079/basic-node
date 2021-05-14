// module 가져옴
const mongoose = require('mongoose');

// bcrypt 가져옴
const bcrypt = require('bcrypt');
// salt가 몇 글자인지 설정
const saltRounds = 10

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

// save 하기 전
userSchema.pre('save', function( next ) {
    var user = this;

    // 필드 값 중 password일 때만
    if(user.isModified('password')) {
        // 비밀번호를 암호화
        // salt를 생성        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            // 입력받은 비밀번호를 암호화
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
    
                user.password = hash
                next()
            })
        })
    }
    
})

// 스키마를 감싸는 모델
const User = mongoose.model('User', userSchema)

// 다른 파일에서도 쓰기위한 설정
module.exports = { User }