import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {

    // get request를 서버에 전송
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => { console.log(response) }) // 결과를 console에 출력
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage