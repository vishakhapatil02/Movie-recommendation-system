
/*nst db = require('../config/db.config'); // ✅ Only once
const bcrypt = require('bcrypt');


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

//home page
exports.gethome = (req, res) => {
  res.render('home');
};
// posthome logic (example)
exports.posthome = (req, res) => {
  res.send("Posted to home!");
};

// Register logic


s.postregister = (req, res) => {
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
}; *

// Login logic
/* orts.postlogin = (req, res) => {
  const { username, password } = req.body;
  console.log("username:", username);
 console.log("Password:", password);

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) return res.send("Error occurred");
   if (results.length > 0) {
   res.redirect('/home'); 
} else {
   res.send("Invalid username or password");
}

  });
}; */

// controllers/auth.controller.js

const db = require('../config/db.config');
const bcrypt = require('bcrypt');

// GET: Dashboard
exports.getdashboard = (req, res) => {
  res.render('index');
};

// GET: Login page
exports.getlogin = (req, res) => {
  res.render('login');
};

// GET: Register page
exports.getregister = (req, res) => {
  res.render('register');
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

// GET: Home page
exports.gethome = (req, res) => {
  res.render('home');
};

// POST: Home example
exports.posthome = (req, res) => {
  res.send("Posted to home!");
};

// POST: Register with validation
exports.postregister = async (req, res) => {
  const username = req.body.username?.trim().toLowerCase();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  // Basic validation
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

  // Check if user already exists
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
      const insertSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(insertSql, [username, email, hashedPassword], (err) => {
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

// POST: Login with validation

exports.postlogin = (req, res) => {
  const username = req.body.username?.trim().toLowerCase();
  const password = req.body.password?.trim();

  if (!username || !password) {
    return res.render('login', { error: "Username and password are required." });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.send("DB error");
    if (results.length === 0) return res.render('login', { error: "Invalid credentials." });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.render('login', { error: "Invalid credentials." });

    //  Generate token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Send token via cookie or localStorage (for now use cookie)
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/home');
  });
};
