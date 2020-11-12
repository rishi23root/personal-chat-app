const socket = io();
const form = document.querySelector('form');

// user join emit
socket.emit('new-user', getCookie('name'))

// any new message from the server
socket.on('notification', (name, message) => {
    // notify to add in chat box but needed a name also 
    notify(name, message)
})

socket.on('message', (name, mes) => {
    message(name, mes, 'left')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input_tag.value.trim() != '') {
        message('you', input_tag.value, 'right')
    }

    // scroll to bottom on every mew message
    mess_cointainer.scrollTop = mess_cointainer.scrollHeight;

    // brodcast message here
    // send message with name
    socket.emit('new-message', name, input_tag.value)

    // clear the input box
    input_tag.value = ''

    // hidden the submit button
    send_btn.classList.add('hidden')
})