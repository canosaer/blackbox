import './styles/main.scss'

import React, { useContext, useState, useEffect } from 'react';
import { Terminal, useEventQueue } from 'crt-terminal';
// import Header from './components/Header'
// import Hero from './components/Hero'
// import Projects from './components/Projects'
// import Footer from './components/Footer'
import axios from 'axios';

function App() {
  const [outbound, setOutbound] = useState('')
  const [messages, setMessages] = useState([])
  const eventQueue = useEventQueue();



  const sendMessage = async (pressedKey) => {
    if(outbound && pressedKey === 'Enter'){
      await axios
      .post('http://localhost:1337/api/message', {
          content: outbound,
      })
      .then(function (response) {
          setMessages(response)
          console.log(messages)
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }

  return (
    <>
        <main className="terminal">
          <Terminal queue={eventQueue} />
          <div className="input">
            <p className="input__prompt"> &gt; </p>
            <input className="input__text" type="text" value={outbound} onChange={(e) => setOutbound(e.target.value)} onKeyDown={(e) => sendMessage(e.key)} autoFocus={true} onBlur={({ target }) => target.focus()} />
          </div>
          
        </main>
    </>
  )
}

export default App