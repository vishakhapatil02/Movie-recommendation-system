const bcrypt = require('bcrypt');
const db = require('../config/db.config');

exports.postregister = async (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword, role], (err) => {
      if (err) {
        console.error("DB error:", err);
        return res.send("Registration failed");
      }
      res.redirect('/login');
    });
  } catch (err) {
    console.error("Hash error:", err);
    res.send("Error during registration");
  }
};

