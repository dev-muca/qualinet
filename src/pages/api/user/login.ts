import UserService from "@/services/http/user-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") login(req, res);

  //   return res.status(400).send({
  //     message: `Método ${req.method} não implementado nesta rota!`,
  //   });
}

async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;
    console.log(email);

    if (!email) return res.status(400).send({ message: `Forneça o e-mail!` });
    if (!password) return res.status(400).send({ message: `Forneça a senha!` });

    const data: any = await UserService.getUserData(email);
    return res.status(200).send(data);
  } catch (err: any) {
    return res
      .status(404)
      .send({ message: `Ocorreu um exceção: ${err.message}` });
  }
}
