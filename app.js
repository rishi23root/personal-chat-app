const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);

let port = process.env.PORT || 80;
app.locals.basedir = __dirname;

app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static(__dirname + '/static'));
// app.set('view engine', 'html');


// socket code
users = {}
io.on('connection', socket => {
    // new user added to chat   
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('notification', name, 'join')
    })

    // listing for user to disconnect 
    socket.on('disconnect', () => {
        // send notification to every one that user is left
        socket.broadcast.emit('notification', users[socket.id], 'leave')
        delete users[socket.id]
    })

    // new chat message
    socket.on('new-message', (name, message) => {
        // send message to everyone but it-self
        socket.broadcast.emit('message', name, message)
    })
})



app.get('/', (req, res) => {
    res.status(200)
        // res.render('mess.html')
        // res.sendFile('mess.html')
    res.sendFile(path.join(__dirname, 'views//mess.html'))
})


server.listen(port, () => {
    console.log(`server is listening on ${port}`)
})