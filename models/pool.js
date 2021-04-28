const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "online-shop",
  password: "joseneto",
  port: 5432,
});


module.exports = {
    pool,
}