const Session = require('../models/session');
const User = require('../models/user');

const SFM = (req, res, next) => {
  console.log('Flash messages:', req.flash('successMsg'), req.flash('errorMsg'));
  res.locals.successMsg = req.flash('successMsg').length > 0 ? req.flash('successMsg') : null;
  res.locals.errorMsg = req.flash('errorMsg').length > 0 ? req.flash('errorMsg') : null;
  res.locals.currentUser = req.user;
  next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    req.flash('errorMsg', 'You must be logged in to do this operation.');
    return res.redirect('/login');
  }
  next();
};

const isAuthorized = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);

    if (!user) {
      req.flash('errorMsg', 'User not found.');
      return res.redirect('/login');
    }

    res.locals.currentUser = user;
    next();
  } catch (err) {
    console.error('Error in authorization middleware:', err);
    req.flash('errorMsg', 'An error occurred while authorizing.');
    res.redirect('/login');
  }
};

const logSession = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (userId) {
      const newSession = new Session({
        user: userId,
        ipAddress,
        loginTime: new Date(),
      });
      await newSession.save();
    }
    next();
  } catch (err) {
    console.error('Error logging session:', err);
    next();
  }
};

module.exports = {
  SFM,
  isLoggedIn,
  isAuthorized,
  logSession,
};
