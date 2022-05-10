import React, { useState, useEffect } from 'react'

import './styles.css'

import { Card } from '../../components/Card'

export function Home() {

  const [userName, setUserName] = useState("...")

  const [users, setUsers] = useState([]);

  const [apiTest, setApiTest] = useState({name: '', avatar: ''})

  function handleAddUser() {
    const newUser = {
      name: userName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setUsers(prevState =>[...prevState, newUser])
  }

  useEffect(() => {
    fetch('https://api.github.com/users/fabiobellaver')
    .then(response => response.json())
    .then(data => {
      setApiTest({
        name: data.name,
        avatar: data.avatar_url
      })
    }).catch(error => console.error(error))
  }, [])

  return (
    <div className="container">

      <header>
        <h1>Lista de Presença</h1>

        <div>
          <a href="https://github.com/FabioBellaver" target="_blank">
          <strong>{apiTest.name}</strong>
          <img src={apiTest.avatar} alt="user avatar" />
          </a>
        </div>

      </header>
    

      <input
      type="text"
      placeholder="Digite o nome..."
      onChange={e => setUserName(e.target.value)}
      />
      
      <button type="button"
      onClick={handleAddUser}
      >
        Adicionar
      </button>

    {users.map(user => (
      <Card
        key={user.time}
        name={user.name}
        time={user.time}
      />
    ))}

    </div>
  )
}
