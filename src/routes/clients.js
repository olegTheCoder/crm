const express = require('express');
const router = express.Router();
// const { Clients }

/* GET home page. */
router.get('/', async (req, res, next) => {
  const allClient = [{
    id: 1,
    name: 'Iliya',
    adress: 'moskva',
    comments: 'Norm pots'
  },
  {
    id: 2,
    name: 'Nekit',
    adress: 'surgut',
    comments: 'okey'
  }]
  //await Clients.findAll({order:[['id', 'DESC']]})
  res.render('clients', { allClient });
});



router.get('/new', (req, res) => {
  res.render('clientCreate')
})

router.post('/new', (req, res) => {
  const { name, adress, comments } = req.body
  const user = Clients.create({name, adress, comments})
res.redirect(`/clients/${user.id}`)
})





router.get('/:id', (req, res) => {
  const { id } = req.params
  const client = {
    id: 1,
    name: 'Iliya',
    adress: 'moskva',
    comments: 'Norm pots'
  }
  //Clients.findByPK(id)
  const orderClient = [
    {
      id: 1,
      orderNumber: 1,
      type: 'Деревеянная',
      price: 300,
      clientId: 1
    },
    {
      id: 2,
      orderNumber: 2,
      type: 'Металлическая',
      price: 499,
      clientId: 1
    }
  ]
  // Orders.findAll({
  //   raw: true,
  //   where: { clientId: id },
  //   order: [['orderNumber', 'DESC']]
  // })
  res.render('basket', { client, orderClient })
})



module.exports = router;
