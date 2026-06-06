import React, { useEffect, useState } from 'react'

function readSharedCookie() {
  const cookies = document.cookie.split(';').map(c => c.trim())
  const kv = cookies.find(c => c.startsWith('shared='))
  return kv ? decodeURIComponent(kv.split('=')[1]) : ''
}

export default function App() {
  const [value, setValue] = useState('')
  const [sessionValue, setSessionValue] = useState('')

  useEffect(() => {
    setValue(readSharedCookie())
    setSessionValue(sessionStorage.getItem('sharedSession') || '')
  }, [])

  function refresh() {
    setValue(readSharedCookie())
    setSessionValue(sessionStorage.getItem('sharedSession') || '')
  }

  function removeCookie() {
    // Remove by setting Max-Age=0
    document.cookie = 'shared=; Path=/; Max-Age=0'
    setValue('')
  }

  function removeSession() {
    sessionStorage.removeItem('sharedSession')
    setSessionValue('')
  }

  function redirectToApp1() {
    window.location.href = 'http://localhost/app1'
  }

  return (
    <div className="app">
      <h1>App 2</h1>
      <p>Read and remove the shared cookie set by other local apps.</p>
      <div className="panel">
        <h3>Cookies</h3>
        {document.cookie ? document.cookie.split(';').map(c => c.trim()).map((c, i) => {
          const [k, ...rest] = c.split('=')
          return <div className="kv" key={i}>{k} = {decodeURIComponent(rest.join('='))}</div>
        }) : <div className="kv">(no cookies)</div>}
        <div style={{ marginTop: 8 }}>
          <button onClick={removeCookie}>Remove Cookie</button>
        </div>
      </div>

      <div className="panel">
        <h3>Session Storage</h3>
        {sessionStorage.length === 0 && <div className="kv">(no session entries)</div>}
        {Array.from({ length: sessionStorage.length }).map((_, i) => {
          const key = sessionStorage.key(i)
          return <div className="kv" key={key}>{key} = {sessionStorage.getItem(key)}</div>
        })}
        <div style={{ marginTop: 8 }}>
          <button onClick={removeSession}>Remove SessionStorage</button>
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <button onClick={refresh}>Refresh</button>
        <button onClick={removeCookie} style={{ marginLeft: '8px' }}>Remove Cookie</button>
        <button onClick={removeSession} style={{ marginLeft: '8px' }}>Remove SessionStorage</button>
        <button onClick={redirectToApp1} style={{ marginLeft: '8px' }}>Go to App1</button>
      </div>
    </div>
  )
}
