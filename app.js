let express = require('express');
let cors = require('cors');
let path = require('path');
let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Corrected view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (e.g., CSS)
app.use(express.static('public'));

//  Route setup
const authroutes = require('./routes/auth.routes');
app.use('/', authroutes);

module.exports = app;

