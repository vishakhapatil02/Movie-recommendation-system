let app = require('./app');
let dotenv = require('dotenv');
dotenv.config();

require('./config/db.config');
let port = Process.env.port || 5000;
app.listen(port, () => {
    console.log('server is running');
})