import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
});

export default pool;
