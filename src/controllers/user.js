const User = require('../models/user');
const supabase = require('../config/supabase');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    req.flash('errorMsg', 'Name, email, and password are required');
    return res.redirect('/register');
  }

  try {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      req.flash('errorMsg', 'Failed to register user');
      return res.redirect('/register');
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    req.flash('successMsg', 'Registration successful! Please verify your email and login.');
    res.redirect('/login');
  } catch (error) {
    req.flash('errorMsg', 'Failed to register user');
    res.redirect('/register');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('errorMsg', 'Email and password are required');
    return res.redirect('/login');
  }

  // Special admin login case
  if (email === 'admin@gmail.com' && password === '123456') {
    req.session.userId = 'admin'; // Set a special identifier for admin
    req.flash('successMsg', 'Admin logged in successfully');
    return res.redirect('/home'); // Redirect to the admin's home or dashboard
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      req.flash('errorMsg', 'Failed to login');
      return res.redirect('/login');
    }

    req.session.userId = data.user.id;
    req.flash('successMsg', 'User logged in successfully');
    res.redirect('/home');
  } catch (error) {
    req.flash('errorMsg', 'Failed to login');
    res.redirect('/login');
  }
};


exports.getRegisterPage = (req, res) => {
  res.render('users/register');
};

exports.getLoginPage = (req, res) => {
  res.render('users/login');
};
