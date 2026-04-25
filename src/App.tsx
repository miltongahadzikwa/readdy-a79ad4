import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { useEffect, useState } from 'react'
import supabase from './supabase'

type Row = {
  id: string | number
  [key: string]: any
}

function App() {
  const [posts, setPosts] = useState<Row[]>([])
  const [registrations, setRegistrations] = useState<Row[]>([])
  const [subscribers, setSubscribers] = useState<Row[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    setLoading(true)

    const [postsRes, regRes, subRes] = await Promise.all([
      supabase.from('posts').select('*'),
      supabase.from('registration').select('*'),
      supabase.from('subscribers').select('*'),
    ])

    if (postsRes.error) console.error('Posts error:', postsRes.error)
    if (regRes.error) console.error('Registration error:', regRes.error)
    if (subRes.error) console.error('Subscribers error:', subRes.error)

    if (postsRes.data) setPosts(postsRes.data)
    if (regRes.data) setRegistrations(regRes.data)
    if (subRes.data) setSubscribers(subRes.data)

    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Supabase Dashboard</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <section>
            <h2>📌 Posts</h2>
            <ul>
              {posts.map((item) => (
                <li key={item.id}>
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>📝 Registrations</h2>
            <ul>
              {registrations.map((item) => (
                <li key={item.id}>
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>📬 Subscribers</h2>
            <ul>
              {subscribers.map((item) => (
                <li key={item.id}>
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}

export default App

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
