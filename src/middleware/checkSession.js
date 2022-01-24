const checkSession = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/clients')
  } else {
    next()
  }
}

module.exports = checkSession
