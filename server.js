let app = require('./app');
let dotenv = require('dotenv');
dotenv.config();

require('./config/db.config.js');
let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('server is running'+port);
});