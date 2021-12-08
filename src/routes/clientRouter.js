const router = require('express').Router();
// const { Client } = require('../../db/models')
// const allowPost = require('../middleware/allowPost')
// const allowEditDelete = require('../middleware/allowEditDelete')


router
  .route('/')
  .get(async (req, res) => {
    // const allClients = await Client.findAll({ raw: true })
    const allClients = ['Bob', 'Beb', 'Bib']

    res.render('entries/clients', { allClients })
  })


module.exports = router;
