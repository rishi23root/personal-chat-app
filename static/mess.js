const mess_cointainer = document.querySelector('.message_con')
const input_tag = document.querySelector('#message_input')
const send_btn = document.querySelector('#btn')

function getCookie(cname) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        var key = c.split('=')[0];
        if (key == cname) {
            return c.split('=')[1]
        }
    }
    return undefined;
}

// capatalise funtion to capatalize the name 
capi = name => { return name[0].toUpperCase() + name.substring(1).toLowerCase(); }

if (getCookie('name') == undefined) {
    name = prompt('Enter your name')
    name = capi(name)
    document.cookie = `name=${name}`;
} else {
    // extract cookies
    name = getCookie('name');
}

name_f = document.querySelector('.name')
name_f.innerText = name

// class message and (left or right ) for message
// example = message('rishi', 'hi every one i am here', 'right')
message = function(name, message, at) {
    name = capi(name)
    message = message.trim()

    mess = document.createElement('div')
    name_span = document.createElement('span')

    // senetation of code is done by innerText
    name_span.innerText = name
    message_div = document.createElement('div')
    message_div.innerText = message

    mess.classList.add('message')
    mess.classList.add(at)

    if (at == 'left') {
        sound.play()
    }

    mess.appendChild(name_span)
    mess.appendChild(message_div)

    mess_cointainer.appendChild(mess)
}

// class notify for class event = leaving or joining
// example = notify('Ram', 'leave') 
notify = (name, event) => {
    name = capi(name)
    mess = document.createElement('div')

    mess.classList.add('notify')
    mess.classList.add('center')

    if (event == 'leave') {
        data = `${name} leave the Chat 😕`;
        mess.innerText = data;
    } else {
        data = `${name} join the Chat 😀`;
        mess.innerText = data;
    }

    mess_cointainer.appendChild(mess)

}

var sound = document.querySelector("audio")
sound.volume = 0.2;

// send button will appear if there is any thing in the input
input_tag.addEventListener('input', (e) => {
    if (e.target.value == '') {
        // hide the button
        send_btn.classList.add('hidden')
    } else {
        // bring send button
        send_btn.classList.remove('hidden')
    }
})