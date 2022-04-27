const express = require('express')
const cors = require('cors')
const { randomUUID } = require('crypto')
const app = express()
const port = 1337

//creates front-end
app.use(express.static('blackbox-client'))
app.use(express.json())
app.use(cors())

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
        timestamp: Date.now(),
        id: randomUUID(),
    })
    res.send(messages)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let messages = [

]