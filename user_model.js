const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
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
    const { username, password } = body
    pool.query('INSERT INTO user_table (username, password) VALUES ($1, $2) RETURNING *', 
    [username, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new User has been added added: ${results.rows[0]}`)
    })
  })
}
const deleteUser = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
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