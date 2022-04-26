const express = require('express')
const { randomUUID } = require('crypto')
const app = express()
const port = 1337

//creates front-end
app.use(express.static('blackbox-client'))
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API operational!')
})

app.get('/api/message', (req, res) => {
    res.send(messages)
})

app.post('/api/message', (req, res) => {
    console.log(req.body.content)

    messages.push({
        content: req.body.content,
        username: req.body.username,
        timestamp: Date.now(),
        id: randomUUID(),
    })
    res.send(messages)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let messages = [
    {
        content: 'Hello',
        username: 'test user',
        timestamp: Date.now(),
        id: randomUUID(),
    }
]