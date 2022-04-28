import './styles/main.scss'

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, useEventQueue } from 'crt-terminal';
import Moment from 'react-moment';
import 'moment-timezone';

import axios from 'axios';

function App() {
  const [outbound, setOutbound] = useState('')
  const [messages, setMessages] = useState([])
  const eventQueue = useEventQueue()

  const messagesEnd = useRef(null)

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const retrieveMessages = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/message')
      setMessages(response)
    } catch (error) {
        console.log(error);
    }
  }

  const sendMessage = async (pressedKey) => {
    if(outbound && pressedKey === 'Enter'){
      await axios
      .post('http://localhost:1337/api/message', {
          content: outbound,
      })
      .then(retrieveMessages)
      .catch(function (error) {
          console.log(error);
      })
      setOutbound('')
    }
  }

  useEffect(() => {
    retrieveMessages()
  }, []);

  return (
    <>
        <main className="terminal">
          <Terminal queue={eventQueue} />
          {messages.data ? 
            <section className ="message-display">
            {messages.data.map((message, i) => {
              const key = message.id

              return(
                <div key={key} className="message">
                  <aside className="message__timestamp">
                    <Moment format="MMM DD h:mm">
                      {message.timestamp}
                    </Moment>
                  </aside>
                  <p className="message__content">{message.content}</p>
                </div>
              )
            })}
            <div ref={messagesEnd} />
          </section>
          :
          null}
          <div className="input">
            <p className="input__prompt"> &gt; </p>
            <input className="input__text" type="text" value={outbound} onChange={(e) => setOutbound(e.target.value)} onKeyDown={(e) => sendMessage(e.key)} autoFocus={true} onBlur={({ target }) => target.focus()} />
          </div>
          
        </main>
    </>
  )
}

export default App