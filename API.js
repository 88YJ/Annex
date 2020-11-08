const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const app = express();

//DB setup
mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Init Middleware
app.use(cors({ origin: true }));
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/Users'));
app.use('/api/servers', require('./routes/Servers'));
app.use('/api/:server_id/channels', require('./routes/Channels'));
app.use('/api/games', require('./routes/Games'));
app.use('/api/auth', require('./routes/Auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
