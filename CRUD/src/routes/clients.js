const express = require('express');
const router = express.Router();
const { Client, Order } = require('../../db/models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const allClient = await Client.findAll({ order: [['id', 'DESC']] })
  res.render('clients', { allClient });
});



router.get('/new', (req, res) => {
  res.render('clientCreate')
})

router.post('/new', async (req, res) => {
  const { name, adress, comments } = req.body
  console.log(name, adress, comments);
  const user = await Client.create({ name, adress, comments })
  res.redirect(`/clients/${user.id}`)
})


router.get('/basket/:id', async (req, res) => {
  const { id } = req.params
  console.log(id);
  const user = await Client.findByPk(id)

  res.render('basketCreate', { user })
})

router.post('/basket/:id', async (req, res) => {
  const { id } = req.params
  const { orderNumber, type, price, deliveryCost, setupCost, comments, deliveryDate, setupDate, courierTeam, setupTeam, status } = req.body
  //console.log("------------->", orderNumber, type, price, deliveryCost, setupCost, comments, deliveryDate, setupDate, courierTeam, setupTeam, status, id);
  const orders = await Order.create({ orderNumber, type, price, deliveryCost, setupCost, comments, deliveryDate, setupDate, courierTeam, setupTeam, status, clientId: id })
  res.redirect(`/clients/${id}`)
})

router.delete('/basket/:id', async (req, res) => {
  const { id } = req.params
  await Order.destroy({ where: { id } })
  res.sendStatus(200)
})



router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Order.destroy({ where: { clientId: id } })
  await Client.destroy({ where: { id } })
  res.sendStatus(200)
})

router.get('/change/:id', async (req, res) => {
  const { id } = req.params
  const user = await Client.findByPk(id)
  res.render('change', { user })
})

router.get('/basket/change/:id', async (req, res) => {
  const { id } = req.params
  const order = await Order.findByPk(id)
  const user = await Client.findByPk(order.clientId)
  res.render('basketChange', { user, order })
})

router.put('/basket/change/:id', async (req, res) => {
  const { orderNumber, type, price, deliveryCost, setupCost, comments, deliveryDate, setupDate, courierTeam, setupTeam, status } = req.body
  const { id } = req.params
  console.log("------->",orderNumber, type, price, deliveryCost, setupCost, comments, deliveryDate, setupDate, courierTeam, setupTeam, status);
  const order = await Order.update({ orderNumber, type, price, deliveryCost, setupCost, comments, deliveryDate, setupDate, courierTeam, setupTeam, status }, { where: { id } })
  const orderNew = await Order.findByPk(id)
  const user = await Client.findByPk(orderNew.clientId)
  console.log("---->", user.id);
  const superId = user.id
  res.json({superId})
})





router.put('/:id', async (req, res) => {
  const { name, adress, comments } = req.body
  const { id } = req.params
  console.log("------->", name, adress, comments);
  const user = await Client.update({ name, adress, comments }, { where: { id } })
  res.sendStatus(200)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const client = await Client.findByPk(id)
  const orderClient = await Order.findAll({
    raw: true,
    where: { clientId: id },
    order: [['orderNumber', 'DESC']]
  })
  res.render('basket', { client, orderClient })
})


module.exports = router;
