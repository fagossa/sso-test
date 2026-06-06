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

  return (
    <div className="app">
      <h1>App 2</h1>
      <p>Read and remove the shared cookie set by other local apps.</p>
      <div>
        <strong>Shared cookie:</strong> {value || <em>not set</em>}
      </div>
      <div style={{ marginTop: '8px' }}>
        <strong>Shared sessionStorage:</strong> {sessionValue || <em>not set</em>}
      </div>
      <div style={{ marginTop: '12px' }}>
        <button onClick={refresh}>Refresh</button>
        <button onClick={removeCookie} style={{ marginLeft: '8px' }}>Remove Cookie</button>
        <button onClick={removeSession} style={{ marginLeft: '8px' }}>Remove SessionStorage</button>
      </div>
    </div>
  )
}
