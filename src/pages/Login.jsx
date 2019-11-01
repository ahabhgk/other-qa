import React, { useState, useEffect } from 'react'
import { InputItem, Button, Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { API } from '../config'

const Login = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const history = useHistory()

  const onLogin = async (id, name) => {
    try {
      const { Status: status, Done: done } = await fetch(`${API}/user/login`, {
        method: 'POST',
        body: `stuNum=${id}&stuName=${name}`,
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        credentials: 'include',
      }).then(res => res.json())

      if (status === 10000) {
        localStorage.setItem('info', JSON.stringify({
          name,
          id,
        }))
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

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('info'))
    if (info) {
      setId(info.id)
      setName(info.name)
      onLogin(info.id, info.name)
    }
  }, [])

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
      <Button onClick={() => onLogin(id, name)} type="primary" className="btn">确定</Button>
    </div>
  )
}

export default Login
