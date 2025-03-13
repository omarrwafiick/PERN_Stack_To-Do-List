const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"WAFickmo11",
    host:"localhost",
    port:"5432",
    database:"todosdb"
});

module.exports = pool;