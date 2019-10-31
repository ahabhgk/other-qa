import React, { useState } from 'react'
import { InputItem, Button, Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { API } from '../config'

const Login = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const history = useHistory()

  const onLogin = async () => {
    try {
      // const xhr = new XMLHttpRequest()
      // xhr.open('POST', `${API}/user/login`)
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      // xhr.withCredentials = true
      // xhr.send(`stuNum=${id}&stuName=${name}`)
      // xhr.onreadystatechange = () => {
      //   if (xhr.readyState === 4) {
      //     if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      //       const { Status: status, Done: done } = JSON.parse(xhr.responseText)
      //       if (status === 10000) {
      //         if (done === 0) {
      //           history.replace('/qa')
      //         } else {
      //           Toast.success('您今天已经答过题了...')
      //         }
      //       } else if (status === 10011) {
      //         Toast.fail('请确认信息无误后重试...')
      //       }
      //     }
      //   }
      // }
      const { Status: status, Done: done } = await fetch(`${API}/user/login`, {
        method: 'POST',
        body: `stuNum=${id}&stuName=${name}`,
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        credentials: 'include',
      }).then(res => res.json())

      if (status === 10000) {
        if (done === 0) {
          history.replace('/qa')
        } else {
          Toast.success('您今天已经答过题了...')
        }
      } else if (status === 10011) {
        Toast.fail('请确认信息无误后重试...')
      }
    } catch (e) {
      console.log(e)
      Toast.fail('网络错误，请重试...')
    }
  }

  return (
    <div className="login-wrapper">
      <InputItem
        className="login-name"
        type="name"
        value={name}
        onChange={val => setName(val)}
        placeholder="输入姓名"
        clear
      >姓名：</InputItem>
      <InputItem
        className="login-id"
        type="number"
        placeholder="输入学号"
        value={id}
        onChange={val => {
          if (val.length <= 10) setId(val)
        }}
        clear
      >学号：</InputItem>
      <Button onClick={onLogin} type="primary" className="btn">确定</Button>
    </div>
  )
}

export default Login
