console.log('main')

let chatUL = document.querySelector('ul.chat')
let messageInput = document.querySelector('input.message')
let messageButton = document.querySelector('button.submit-message')

messageInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        submitMessage()
    }
})


let rebuildMessageList = (response) => {
    chatUL.innerHTML = ''
    response.data.forEach(message => {
        let newMessageLI = document.createElement('li')
        newMessageLI.innerHTML = message.content

        let messageTimeStamp = document.createElement('small')
        messageTimeStamp.innerHTML = message.timestamp
        newMessageLI.append(messageTimeStamp)

        chatUL.append(newMessageLI)
    });
}

let submitMessage = () => {
    axios
    .post('/api/message', {
        content: messageInput.value,
    })
    .then(function (response) {
        console.log(response);
        rebuildMessageList(response)
        messageInput.value = ''
        messageInput.focus()
    })
    .catch(function (error) {
        console.log(error);
    });
}


messageButton.addEventListener('click', submitMessage)

let fetchMessages = () => {
    axios
    .get('/api/message')
    .then(function (response) {
    // handle success
    rebuildMessageList(response)
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


}

setInterval(fetchMessages, 2000)