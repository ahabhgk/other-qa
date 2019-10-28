import React from 'react'
import './App.css'
import { Button, List } from 'antd-mobile'

function App() {
  return (
    <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
      <List.Item
        extra={<Button type="ghost" size="small" inline>small</Button>}
        multipleLine
      >
        Regional manager
        <List.Item.Brief>
          Can be collected, refund, discount management, view data and other operations
        </List.Item.Brief>
      </List.Item>
      <List.Item
        extra={<Button type="primary" size="small" inline>small</Button>}
        multipleLine
      >
        Regional manager
        <List.Item.Brief>
          Can be collected, refund, discount management, view data and other operations
        </List.Item.Brief>
      </List.Item>
    </List>
  )
}

export default App
