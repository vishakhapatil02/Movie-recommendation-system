
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

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
        if (decoded.role === 'ADMIN') {
            res.render('dashboard', { username: decoded.username, activeTab: 'add-movie' });
        } else {
            res.redirect('/user/dashboard');
        }
    } catch (err) {
        res.clearCookie('token');
        res.redirect('/login');
    }
};

// GET: User Dashboard Page (Protected)
exports.getUserDashboard = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded.role === 'USER') {
            res.render('user_dashboard/dashboard', { username: decoded.username });
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.clearCookie('token');
        res.redirect('/login');
    }
};

// POST: Register user
exports.postregister = async (req, res) => {
    const username = req.body.username?.trim().toLowerCase();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!username || !email || !password) {
        return res.render('register', { error: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render('register', { error: 'Invalid email format.' });
    }

    if (password.length < 6) {
        return res.render('register', { error: 'Password must be at least 6 characters.' });
    }

    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
        if (err) {
            console.error('DB error:', err);
            return res.render('register', { error: 'Error checking existing users.' });
        }

        if (results.length > 0) {
            return res.render('register', { error: 'Username or Email already exists.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                [username, email, hashedPassword, 'USER'],
                (err) => {
                    if (err) {
                        console.error('DB insert error:', err);
                        return res.render('register', { error: 'Registration failed.' });
                    }
                    res.redirect('/login');
                }
            );
        } catch (err) {
            console.error('Hashing error:', err);
            res.render('register', { error: 'Error during registration.' });
        }
    });
};

// POST: Login user
exports.postlogin = (req, res) => {
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!username || !password) {
        return res.render('login', { error: 'Username and password are required.' });
    }

    // Admin login
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username: 'admin', role: 'ADMIN' }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        return res.redirect('/admin/dashboard');
    }

    // User login
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.render('login', { error: 'Database error.' });
        if (results.length === 0) return res.render('login', { error: 'Invalid username or password.' });

        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.render('login', { error: 'Invalid username or password.' });
            }

            const token = jwt.sign(
                { id: user.user_id, username: user.username, role: user.role },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { httpOnly: true });

            if (user.role === 'ADMIN') {
                return res.redirect('/admin/dashboard');
            } else {
                return res.redirect('/user/dashboard');
            }
        });
    });
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

module.exports = exports;