const path = require('path'); // on top

// Serve Static assests if in production
if (process.env.NODE_ENV === 'production') {
 app.use(express.static('client/build')); // change this if your dir structure is different
 app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
 });
}

const express = require('express');
const connectDB = require('./config/db');
const { Console } = require('console');

const app = express();

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Annex!' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/servers', require('./routes/servers'));
app.use('/api/servers/channels', require('./routes/channels'));
app.use('/api/games', require('./routes/games'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/storegames', require('./routes/storegames'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
