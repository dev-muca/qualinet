import { readFileSync } from "fs";
import pool from "../database/pool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const Product = {
  async getAllProducts() {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./SQL/get-all-products.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql);
      conn.release();
      return result;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  },

  async getProductByName({ name }: Product) {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./SQL/get-product-by-name.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql, [name]);
      conn.release();
      return result;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  },

  async createProduct({ name, description }: Product) {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./SQL/create-product.sql").toString();
      const [result] = await conn.query<ResultSetHeader>(sql, [name, description]);
      conn.release();
      return result;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  },
};

export default Product;
