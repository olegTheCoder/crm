const router = require('express').Router()

router.get('/', (req, res) => {
  res.redirect('/users')
})

module.exports = router
