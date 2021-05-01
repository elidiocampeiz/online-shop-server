const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "online-shop",
  password: "joseneto",
  port: 5432,
});

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "store_database",
//   password: "OnlineShop001",
//   port: 5432,
// });

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM user_table ORDER BY user_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const login = (username, password) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM user_table ORDER BY user_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows.find((u) => u.username == username && u.password == password)||false);
    })
  }) 
}

const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, password, is_adm } = body
    pool.query('INSERT INTO user_table (username, password, is_adm) VALUES ($1, $2, $3) RETURNING *', 
    [username, password, is_adm], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

const deleteUser = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM user_table WHERE user_id = $1', 
    [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`User deleted with ID: ${id}`)
    })
  })
}

const getProducts = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM products_table ORDER BY product_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createProduct = (product_name, price ) => {
  return new Promise(function(resolve, reject) {
    
    pool.query('INSERT INTO products_table (product_name, price) VALUES ($1, $2) RETURNING *', 
    [product_name, price], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new product has been added.`)
    })
  })
}

const deleteProduct = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM products_table WHERE product_id = $1', 
    [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Product deleted with ID: ${id}`)
    })
  })
}

const getOrders = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM order_table ORDER BY order_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

//Function that allows the user to see his/her purchase history
const getOrdersPerUser = (userid) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM order_table WHERE uID = $1 ORDER BY order_id ASC', [userid], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results, "HERE");
      resolve(results.rows);
    })
  }) 
}

const createOrder = (uID, price) => {
  return new Promise(function(resolve, reject) 
  {
    pool.query('INSERT INTO order_table (uID, price, date_of_order) VALUES ($1, $2, current_timestamp) RETURNING *', 
    [uID, price], (error, results) => {
      if (error) {
        reject(error)
      }
      else{
        resolve(results.rows[0]);
      }
    });
  });
}

const deleteOrder = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM order_table WHERE order_id = $1', 
    [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Order deleted with ID: ${id}`)
    })
  })
}

const getSales = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM sales_table ORDER BY orderID ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const getAvgOrders = () =>{
  return new Promise(function(resolve, reject) {
    pool.query('select  avg(cast(sumval as float)) from (select uID, count(order_id) as sumval from order_table group by uID) order_table;', (error, results) => {
      if (error) {
        reject(error)
      }
      else{
        resolve(results.rows[0]||0);
      }
    })
  }) 
  //select  avg(cast(sumval as float)) from (select uID, count(order_id) as sumval from order_table group by uID) order_table;
}
//Function that allows admin to see sales per product
const getSalesPerProduct = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT S.productID, P.product_name, P.price, count(S.orderID) FROM sales_table S, products_table P WHERE P.product_id = S.productID GROUP BY S.productID, P.product_name, P.price ORDER BY S.productID ASC;', (error, results) => {
      if (error) {
        reject(error)
      }
      else{
        resolve(results.rows);
      }
    })
  }) 
}

//Function that allows admin to see sales per date
const getSalesPerDate = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT count(S.orderID), S.date_of_sale FROM sales_table S GROUP BY S.date_of_sale ORDER BY S.date_of_sale ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      else{
        resolve(results.rows);
      }
    })
  }) 
}

const createSale = (orderID, productID, product_count) => {
  return new Promise(function(resolve, reject) {
    
    pool.query('INSERT INTO sales_table (orderID, productid, product_count, date_of_sale) VALUES ($1, $2, $3, current_timestamp) RETURNING *', 
    [orderID, productID, product_count], (error, results) => {
      if (error) {
        reject(error)
      }
      else{
        resolve(results.rows[0])
      }
    })
  })
}
  

module.exports = {
  getUsers,
  login,
  createUser,
  deleteUser,
  getProducts,
  createProduct,
  deleteProduct,
  getOrders,
  getOrdersPerUser,
  createOrder,
  deleteOrder,
  getSales,
  getSalesPerProduct,
  getSalesPerDate,
  getAvgOrders,
  createSale,
}