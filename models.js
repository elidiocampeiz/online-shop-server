const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "online-shop",
  password: "joseneto",
  port: 5432,
});

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

const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, password, is_adm } = body
    pool.query('INSERT INTO user_table (username, password, is_adm) VALUES ($1, $2, $3) RETURNING *', 
    [username, password, is_adm], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new User has been added added`)
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



module.exports = {
  getUsers,
  createUser,
  deleteUser,
}