import { readFileSync } from "fs";
import pool from "../database/pool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const User = {
  async getUser(email: string) {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./SQL/get-user.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql, [email]);
      conn.release();
      return result;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  },

  async registerUser({ name, email, password, type }: User) {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./SQL/register-user.sql").toString();
      const [result] = await conn.query<ResultSetHeader>(sql, [name, email, password, type]);
      conn.release();
      return result;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  },
};

export default User;
