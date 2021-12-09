const checkSession = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/client')
  } else {
    next()
  }
}

module.exports = checkSession
