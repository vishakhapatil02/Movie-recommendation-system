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
  const sql = "INSERT INTO userinfo (user_name, user_email, user_password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err) => {
    if (err) {
      console.error(err);
      return res.send("Registration failed");
    }
    res.redirect('/login');
  });
};

// Login logic
exports.postlogin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userinfo WHERE user_email = ? AND user_password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.send("Error occurred");
    if (results.length > 0) {
      res.redirect('/dashboard');
    } else {
      res.send("Invalid email or password");
    }
  });
};
