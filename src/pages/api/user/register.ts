import { RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";
import { hashSync } from "bcrypt";

import pool from "@/services/database/pool";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") register(req, res);
}

async function register(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fullname, email, password, retypedPassword, type } = req.body;

    if (!fullname)
      return res.status(400).send({
        error: { field: "fullname", message: "Forneça seu nome completo!" },
      });

    if (!email)
      return res
        .status(400)
        .send({ error: { field: "email", message: "Forneça um e-mail!" } });

    if (!password || password.length < 8)
      return res.status(400).send({
        error: {
          field: "password",
          message: "Forneça uma senha válida (mínimo 8 caracteres)",
        },
      });

    if (password != retypedPassword)
      return res.status(400).send({
        error: {
          field: "retypedPassword",
          message: "Suas senhas são diferentes!",
        },
      });

    // check e-mail already exists in db;
    try {
      const conn = await pool.getConnection();
      const sql = "SELECT COUNT(*) already FROM users WHERE email = ?";
      const [result] = await conn.query<RowDataPacket[]>(sql, [email]);

      if (result[0].already > 0) {
        conn.release();
        return res
          .status(400)
          .send({
            error: { field: "email", message: "Este e-mail já está em uso!" },
          });
      }

      const hashPass = hashSync(password, 16);

      const sql1 =
        "INSERT INTO users (fullname, email, password, type) VALUES (?, ?, ?, ?)";

      const [result1] = await conn.query<RowDataPacket[]>(sql1, [
        fullname,
        email,
        hashPass,
        type,
      ]);

      console.log(result1);

      return res.end();
    } catch (err: any) {
      // return err.message;
      console.log("ERROR:", err.message);
      return null;
    }
  } catch (err: any) {
    return res
      .status(404)
      .send({ message: `Ocorreu um exceção: ${err.message}` });
  }
}
