let express = require('express');
let cors =require('cors');
let app =express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/', (req, res) => {
    res.send('welcome');
});



module.exports=app;
