const express = require('express');
const connectDB = require('./config/db');
const { Console } = require('console');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Annex!' }));

io.on('connection', function (socket) {
 console.log('user connected');
 socket.on('chat message', function (msg) {
  console.log(msg);
  io.emit('chat message', msg);
 });
});

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/servers', require('./routes/servers'));
app.use('/api/games', require('./routes/games'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
http.listen(5001, function () {
 console.log('listening on *:5001');
});
