const router = require('express').Router()

router.get('/', (req, res) => {
  res.redirect('/user')
})

module.exports = router
