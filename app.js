const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes');
const partialRoutes = require('./routes/partials.routes'); 

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',authRoutes);

// Routes
// app.use('/', authRoutes);
 

app.get('/',(req, res) => {
  res.render('/login');
});

app.use('/movies', movieRoutes); 
app.use('/',authRoutes);

app.get('/partials/:name', (req, res) => {
  const viewName = req.params.name;
 res.render(`snippets/${viewName}`); // ✅

});
module.exports = app;
