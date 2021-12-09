const checkAdmin = (req, res, next) => {
  if (!req.session.userAdmin) {
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = checkAdmin
