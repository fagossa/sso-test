import React, { useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('')
  const [sessionStatus, setSessionStatus] = useState('')

  function writeCookie() {
    // Set a cookie visible to the localhost host for 1 hour
    document.cookie = 'shared=Hello from app1; Path=/; Max-Age=3600'
    setStatus('Cookie written: shared=Hello from app1')
  }

  function writeSession() {
    sessionStorage.setItem('sharedSession', 'Session from app1')
    setSessionStatus('SessionStorage written: sharedSession=Session from app1')
  }

  return (
    <div className="app">
      <h1>App1</h1>
      <p>Write a cookie that other local apps can read.</p>
      <button onClick={writeCookie}>Set Shared Cookie</button>
      <div style={{ marginTop: '12px' }}>
        <button onClick={writeSession}>Set Shared SessionStorage</button>
        {sessionStatus && <p>{sessionStatus}</p>}
      </div>
      {status && <p>{status}</p>}
    </div>
  )
}
