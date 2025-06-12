const db = require('../config/db.config');

exports.getdashboard = (req, res) => {
    res.render('index');
};

exports.getlogin = (req, res) => {  
    res.render('login');
};//login page

exports.getregister = (req, res) => {
    res.render('register');
};

exports.postregister = (req, res) => {
    const {username, email, password} = req.body;
    const sql ="INSERT INTO usersinfo (user_name, user_email, user_password) values (?,?,?)";
    db.query(sql,[username, email,password], (err, result)=> {
        if(err){
            console.error(err);
            return res.send("registration failed");
        }
        res.redirect('/login');
    });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userinfo WHERE user_email = ? AND user_password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.send("Error occurred");
    if (results.length > 0) {
      res.send("Login successful! Redirecting to dashboard...");
    } else {
      res.send("Invalid email or password");
    }
  });
};