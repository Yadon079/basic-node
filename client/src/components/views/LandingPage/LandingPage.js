import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage(props) {

    // get request를 서버에 전송
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => { console.log(response) }) // 결과를 console에 출력
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                props.history.push("/login")
            } else {
                alert('로그아웃 실패')
            }
        })
    }


    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>

        </div>
    )
}

export default LandingPage