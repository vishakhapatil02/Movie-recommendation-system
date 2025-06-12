let express = require('express');
let cors =require('cors');
let path = require('path');
let app =express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

//routes
const authroutes = require('./routes/auth.routes');
app.use('/', authroutes);



module.exports=app;
