import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Toast, Radio, Button, Icon, List } from 'antd-mobile'
import { API } from '../config'

const RadioItem = Radio.RadioItem

const QandA = () => {
  const history = useHistory()
  const [all, setAll] = useState([])
  const [question, setQuestion] = useState({})
  const [finish, setFinish] = useState(false)
  const [answers, setAnswers] = useState([])
  const index = useRef(0)

  useEffect(() => {
    const getAll = async () => {
      try {
        const { Status: status, questions } = await fetch(`${API}/question`)
          .then(res => res.json())
        
        if (status === 10000) {
          setAll(questions)
        }
      } catch (e) {
        Toast.fail('网络错误，请刷新...')
      }
    }

    getAll()
  }, [])

  useEffect(() => {
    setQuestion(all[index.current])
  }, [all])

  const onNext = () => {
    if (index.current < 2) {
      index.current += 1
      setQuestion(all[index.current])
      if (index.current === 2) setFinish(true)
    }
  }

  const onChange = val => {
    if (!answers[index.current]) {
      const arr = [...answers]
      arr[index.current] = val
      setAnswers(arr)
    }
  }

  const onCommit = async () => {
    const num = all.reduce((acc, cur, index) => {
      if (cur.Answer === answers[index]) return acc + 1
      return acc
    }, 0)

    try {
      const { Status: status } = await fetch(`${API}/user/put`, {
        method: 'POST',
        body: `num=${num}`,
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        credentials: 'include',
      }).then(res => res.json())

      if (status === 10000) {
        Toast.success(`答题完成，答对${num}道～`)
        setTimeout(() => history.replace('/'), 2000)
      }
    } catch (e) {
      Toast.fail('网络错误，请刷新...')
    } 
  }

  return (
    <div className="qa-wrapper">
      {question ? (
        <div className="question">
          <div className="subject">
            {question.Subject}
          </div>
          <List renderHeader={() => 'Your answer:'} className="answers">
            <RadioItem checked={answers[index.current] === 'A'} onChange={() => onChange('A')}>A: {question.A}</RadioItem>
            <RadioItem checked={answers[index.current] === 'B'} onChange={() => onChange('B')}>B: {question.B}</RadioItem>
            <RadioItem checked={answers[index.current] === 'C'} onChange={() => onChange('C')}>C: {question.C}</RadioItem>
            <RadioItem checked={answers[index.current] === 'D'} onChange={() => onChange('D')}>D: {question.D}</RadioItem>
          </List>
          <div className="explain">
            {answers[index.current] && question.Explain}
          </div>
        </div>
      ) : <div className="loading">Loading...</div>}
      <span className="arrow-align" onClick={onNext}>下一题<Icon type="right" /></span>
      <Button
        onClick={onCommit}
        type="primary"
        disabled={!finish}
        className="btn"
      >完成</Button>
    </div>
  )
}

export default QandA
