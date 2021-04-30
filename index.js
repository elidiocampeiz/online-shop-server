const { response } = require('express');
const express = require('express');
const app = express();
const port = 3001;

const models = require('./models');

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.get('/user/get', (req, res) => {
  models.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/user/add', (req, res) => {
  models.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.delete('/user-delete/:id', (req, res) => {
  let { id } = req.params;
  models.deleteUser(id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/product/get', (req, res) => {
  models.getProducts()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/product/add', (req, res) => {
  const { product_name, price } = req.body
  const p = parseFloat(price);
  models.createProduct(product_name, p)

  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/product-delete/:id', (req, res) => {
  let { id } = req.params;
  models.deleteProduct(id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/order/get', (req, res) => {
  models.getOrders
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/order/add', (req, res) => {
  const { uID, value, date_of_order } = req.body
  const v = parseFloat(value);
  const dt = new Date(date_of_order)
  models.createOrder(uID, v, dt)

  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/order-delete/:id', (req, res) => {
  let { id } = req.params;
  models.deleteOrder(id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/sales/get', (req, res) => {
  models.getSales()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/sales/add', (req, res) => {
  const { orderID, productID, product_count, date_of_sale } = req.body
  const pc = parseFloat(product_count);
  const ds = new Date(date_of_sale)
  models.createProduct(orderID, productID, pc, ds)

  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})