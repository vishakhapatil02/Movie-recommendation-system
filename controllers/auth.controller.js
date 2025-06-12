const db = require('../config/db.config');

// Dashboard
exports.getdashboard = (req, res) => {
  res.render('index');
};

// Login page
exports.getlogin = (req, res) => {
  res.render('login');
};

// Register page
exports.getregister = (req, res) => {
  res.render('register');
};

// Register logic
exports.postregister = (req, res) => {
  const { username, email, password } = req.body;
  console.log("from data received:", username, email, password);
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err) => {
    if (err) {
      console.error("DB error:", err);
      return res.send("Registration failed");
    }
                                                                                   
    res.redirect('/login');
  });
};

// Login logic
exports.postlogin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.send("Error occurred");
    if (results.length > 0) {
       res.send("Invalid email or password");
     
    } else {
      res.redirect('/index');
    }
  });
}; 



