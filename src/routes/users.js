const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../../db/models')
const checkSession = require('../middleware/checkSession')

const saltRounds = 5

router.route('/')
  .get(checkSession, (req, res) => {
    res.render('login')
  })
  .post(async (req, res) => {
    try {
      const { login, password } = req.body.inputs
      const currUser = await User.findOne({
        where: {
          login,
        },
      })
      if (login === 'admin') {
        if (!currUser || !((password === currUser.password))) {
          return res.sendStatus(500)
        }

        req.session.userId = currUser.id
        req.session.userLogin = currUser.login
        req.session.userAdmin = currUser.isAdmin
        res.sendStatus(200)
      }
      else {
        if (!currUser || !(await bcrypt.compare(password === currUser.password))) {
          return res.sendStatus(500)
        }

        req.session.userId = currUser.id
        req.session.userLogin = currUser.login
        req.session.userAdmin = currUser.isAdmin

        res.sendStatus(200)
      }
    } catch (err) {
      res.sendStatus(500)
    }
  })

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.clearCookie('elbrusid')
  res.redirect('/')
})


module.exports = router;
