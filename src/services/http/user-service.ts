import { RowDataPacket } from "mysql2";
import pool from "../database/pool";

const UserService = {
  async getUserData(email: string) {
    try {
      const conn = await pool.getConnection();
      const query = "SELECT * FROM users WHERE email = ?";
      const res = await conn.query<RowDataPacket[]>(query, [email]);
      if (!res) return null;

      return res[0][0];
    } catch (err: any) {
      console.log("Erro ao obter usuário do banco de dados:", err.message);
      return null;
    }
  },
};

export default UserService;
