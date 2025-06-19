 const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// =================== GET Routes ===================

// GET: Login Page
exports.getlogin = (req, res) => {
  res.render('login', { error: null });
};

// GET: Register Page
exports.getregister = (req, res) => {
  res.render('register');
};

// GET: Home Page
exports.gethome = (req, res) => {
  res.render('home');
};

// GET: Index Page
exports.IndexPage = (req, res) => {
  res.render('index');
};

// GET: Admin Dashboard Page (Protected)
exports.getdashboard = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.render('admin/dashboard', { username: decoded.username });
  } catch (err) {
    res.clearCookie('token');
    res.redirect('/login');
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

// =================== POST Routes ===================

// POST: Register user
exports.postregister = async (req, res) => {
  const username = req.body.username?.trim().toLowerCase();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  if (!username || !email || !password) {
    return res.send("All fields are required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.send("Invalid email format.");
  }

  if (password.length < 6) {
    return res.send("Password must be at least 6 characters.");
  }

  const checkSql = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkSql, [username, email], async (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.send("Error checking existing users.");
    }

    if (results.length > 0) {
      return res.send("Username or Email already exists.");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertSql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [username, email, hashedPassword, 'USER'], (err) => {
        if (err) {
          console.error("DB insert error:", err);
          return res.send("Registration failed.");
        }
        res.redirect('/login');
      });
    } catch (err) {
      console.error("Hashing error:", err);
      res.send("Error during registration.");
    }
  });
};

// POST: Login user
 // POST: Login user
exports.postlogin = (req, res) => {
  const username = req.body.username?.trim().toLowerCase();
  const password = req.body.password?.trim();

  if (!username || !password) {
    return res.render('login', { error: "Username and password are required." });
  }

  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ username: 'admin', role: 'ADMIN' }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/admin/dashboard'); // ✅ FIXED
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.render('login', { error: "Database error." });

    if (results.length === 0) {
      return res.render('login', { error: "Invalid username or password." });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.render('login', { error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/admin/dashboard'); // ✅
  });
};

// GET: Admin Dashboard Page
exports.getdashboard = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.render('admin_dashboard/dashboard', { username: decoded.username }); // ✅
  } catch (err) {
    res.clearCookie('token');
    res.redirect('/login');
  }
};
