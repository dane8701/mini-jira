const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

//routes controllers
const router = require('./routes/router');
const taskRoutes = require('./routes/task');
const statusRoutes = require('./routes/status');
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user');

const DbServer = `mongodb+srv://admin:8o13rzuj3r3cQFj4@clusterfree.onhaoec.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(DbServer,
  { useNewUrlParser: true,
  useUnifiedTopology: true }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use(cors());
app.use(cors({origin: true, credentials: true}));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.use('/api/task', taskRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/user', userRoutes);

module.exports = app;