const SessionModel = require('../models/session');

exports.getSessions = async (req, res) => {
  try {
    const sessions = await SessionModel.find().populate('user');
    res.render('sessions/list', { sessions });
  } catch (err) {
    req.flash('errorMsg', 'Failed to retrieve sessions');
    res.redirect('/');
  }
};
