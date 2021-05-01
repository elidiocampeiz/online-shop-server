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
app.post('/user/login', (req, res) => {
  const {username, password} = req.body;
  models.login(username, password)
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
  models.createProduct(product_name, price)

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

app.post('/order/get-history', (req, res) => {
  const { uID } = req.body
  models.getOrdersPerUser(uID)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/order/get', (req, res) => {
  models.getOrders()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/order/add', (req, res) => {
  const { uID, price } = req.body
  models.createOrder(uID, price)

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

app.get('/sales/get-product', (req, res) => {
  models.getSalesPerProduct()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/sales/get-date', (req, res) => {
  const { date_of_sale } = req.body
  const dds = new Date(date_of_sale)
  models.getSalesPerDate(dds)
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
  const { orderID, productID, product_count } = req.body
  const pc = parseFloat(product_count);
  const oId = parseInt(orderID);
  const pId = parseInt(productID);
  models.createSale(oId, pId, pc)

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