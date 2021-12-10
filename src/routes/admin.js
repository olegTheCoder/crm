const express = require('express');
const router = express.Router();
const { User } = require('../../db/models')
const checkAdmin = require('../middleware/checkAdmin')

router.route('/')
  .get(checkAdmin, async (req, res) => {
    let users = await User.findAll({ raw: true, orderBy: [['createdAt', 'DESC']], })
    res.render('admin', { users })
  })


router.route('/new')
  .get(checkAdmin, (req, res) => {
    res.render('entries/newUser', {})
  })
  .post(async (req, res) => {
    try {
      const { login, password, isAdmin } = req.body
      const newUser = await User.create({ login, password, isAdmin })
      res.sendStatus(200)
    } catch (err) {
      res.sendStatus(500)
    }
  })

router.route('/:id/edit')
  .patch(checkAdmin, async (req, res) => {
    try {
      let newStatus
      if (req.body.status.length === 4)
        newStatus = false
      else
        newStatus = true
      await User.update({ isAdmin: newStatus }, { where: { id: req.params.id } });
      console.log("server after:", newStatus);
      res.json({ newStatus })
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .delete(checkAdmin, async (req, res) => {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })


module.exports = router;