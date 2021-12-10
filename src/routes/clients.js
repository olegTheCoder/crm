const express = require('express');

const router = express.Router();
const { Client, Order } = require('../../db/models');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const allClient = await Client.findAll({ order: [['id', 'DESC']] });
  res.render('clients', { allClient });
});

// поиск клиента

router.put('/search', async (req, res) => {
  const temp = req.body;
  res.json(temp);
});

router.get('/search', async (req, res) => {
  const { text, select } = await req.query;
  const allClient = await Client.findAll({
    where: { [select]: text },
    order: [['id', 'DESC']],
  });
  res.render('clientSearch', { allClient });
});

// поиск заказа

router.put('/search_order', async (req, res) => {
  const temp = req.body;
  res.json(temp);
});

router.get('/search_order', async (req, res) => {
  const { text, select } = await req.query;
  console.log('------------->', req.query);
  const orderClient = await Order.findAll({
    where: { [select]: text },
    order: [['id', 'DESC']],
  });
  res.render('basketSearch', { orderClient });
});

router.get('/new', (req, res) => {
  res.render('clientCreate');
});

router.post('/new', async (req, res) => {
  const { name, adress, comments } = req.body;
  console.log(name, adress, comments);
  const lol = `${comments} от пользователя [${res.locals.userLogin}]!`;
  console.log(lol);
  const user = await Client.create({ name, adress, comments: lol });
  res.redirect(`/clients/${user.id}`);
});

router.get('/basket/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await Client.findByPk(id);

  res.render('basketCreate', { user });
});

router.post('/basket/:id', async (req, res) => {
  const { id } = req.params;
  const {
    orderNumber, type, price, comments, deliveryDate, setupDate, courierTeam, setupTeam, status,
  } = req.body;
  // console.log("------------->", orderNumber, type, price, deliveryCost, setupCost, comments, deliveryDate, setupDate, courierTeam, setupTeam, status, id);
  const deliveryCost = price / 10;
  const setupCost = price / 20;
  const lol = `${comments} - от пользователя [${res.locals.userLogin}]!`;
  const orders = await Order.create({
    orderNumber, type, price, deliveryCost, setupCost, comments: lol, deliveryDate, setupDate, courierTeam, setupTeam, status, clientId: id,
  });
  res.redirect(`/clients/${id}`);
});

router.delete('/basket/:id', async (req, res) => {
  const { id } = req.params;
  await Order.destroy({ where: { id } });
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Order.destroy({ where: { clientId: id } });
  await Client.destroy({ where: { id } });
  res.sendStatus(200);
});

router.get('/change/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Client.findByPk(id);
  res.render('change', { user });
});

router.get('/basket/change/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  const user = await Client.findByPk(order.clientId);
  res.render('basketChange', { user, order });
});

router.put('/basket/change/:id', async (req, res) => {
  const {
    orderNumber, type, price, comments, deliveryDate, setupDate, courierTeam, setupTeam, status,
  } = req.body;
  const { id } = req.params;
  console.log('------->', orderNumber, type, price, comments, deliveryDate, setupDate, courierTeam, setupTeam, status);
  const deliveryCost = price * 0.10;
  const setupCost = price * 0.20;
  const orderCom = await Order.findByPk(id);
  const newComment = `${orderCom.comments} ${comments} - от пользователя [${res.locals.userLogin}]!`;
  const order = await Order.update({
    orderNumber, type, price, deliveryCost, setupCost, comments: newComment, deliveryDate, setupDate, courierTeam, setupTeam, status,
  }, { where: { id } });
  const orderNew = await Order.findByPk(id);
  const user = await Client.findByPk(orderNew.clientId);
  console.log('---->', user.id);
  const superId = user.id;
  res.json({ superId });
});

router.put('/:id', async (req, res) => {
  const { name, adress, comments } = req.body;
  const { id } = req.params;
  const userCom = await Client.findByPk(id);
  const newComment = `${userCom.comments} ${comments} от пользователя [${res.locals.userLogin}]!`;
  console.log('------->', name, adress, comments);
  const user = await Client.update({ name, adress, comments: newComment }, { where: { id } });
  res.sendStatus(200);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const client = await Client.findByPk(id);
  const orderClient = await Order.findAll({
    raw: true,
    where: { clientId: id },
    order: [['orderNumber', 'DESC']],
  });
  res.render('basket', { client, orderClient });
});

module.exports = router;
