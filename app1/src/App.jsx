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

  function redirectToApp2() {
    window.location.href = 'http://localhost/app2'
  }

  function readCookies() {
    if (!document.cookie) return []
    return document.cookie.split(';').map(c => c.trim()).map(c => {
      const [k, ...rest] = c.split('=')
      return { key: k, value: decodeURIComponent(rest.join('=')) }
    })
  }

  function readSessionEntries() {
    const res = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      res.push({ key, value: sessionStorage.getItem(key) })
    }
    return res
  }

  return (
    <div className="app">
      <h1>App1</h1>
      <p>Write a cookie that other local apps can read.</p>

      <div className="panel">
        <h3>Cookies</h3>
        <div style={{ marginBottom: 8 }}>
          <button onClick={writeCookie}>Set Shared Cookie</button>
        </div>
        {status && <div className="kv">{status}</div>}
        {readCookies().length === 0 && <div className="kv">(no cookies)</div>}
        {readCookies().map(({ key, value }) => (
          <div key={key} className="kv">{key} = {value}</div>
        ))}
      </div>

      <div className="panel">
        <h3>Session Storage</h3>
        <div style={{ marginBottom: 8 }}>
          <button onClick={writeSession}>Set Shared SessionStorage</button>
          <button onClick={redirectToApp2} style={{ marginLeft: '8px' }}>Go to App2</button>
        </div>
        {sessionStatus && <div className="kv">{sessionStatus}</div>}
        {readSessionEntries().length === 0 && <div className="kv">(no session entries)</div>}
        {readSessionEntries().map(({ key, value }) => (
          <div key={key} className="kv">{key} = {value}</div>
        ))}
      </div>
    </div>
  )
}
