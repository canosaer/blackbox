import './styles/main.scss'

import React, { useContext, useState, useEffect } from 'react';
import { Terminal, useEventQueue, textLine, textWord } from 'crt-terminal';
// import Header from './components/Header'
// import Hero from './components/Hero'
// import Projects from './components/Projects'
// import Footer from './components/Footer'
import axios from 'axios';


const bannerText = `
Hello world!

And not only world
`;


function App() {
  const [outbound, setOutbound] = useState('')
  const [messages, setMessages] = useState([])
  const eventQueue = useEventQueue();
  const { print } = eventQueue.handlers;

  return (
    <>
        <main className="terminal">
          <Terminal queue={eventQueue} />
          <div className="input">
            <p className="input__prompt"> &gt; </p>
            <input className="input__text" type={'text'}  autoFocus={true} onBlur={({ target }) => target.focus()} />
          </div>
          
        </main>
    </>
  )
}

export default App