import SECRET_KEY from "@/constants/KEY";
import HttpService from "@/services/http";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

function GET(req: NextApiRequest, res: NextApiResponse) {}
async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const errors = [];
    const { email, password } = req.body;

    if (!email) errors.push({ field: "email", message: "Forneça seu email!" });
    if (!password) errors.push({ field: "password", message: "Forneça sua senha!" });
    if (errors.length) return res.status(400).send({ errors });

    const data = await HttpService.User.getUser(email);
    if (!data?.length) errors.push({ field: "email", message: "E-mail não cadastrado no sistema!" });
    if (errors.length) return res.status(400).send({ errors });

    const userInformation: User = {
      userid: data![0].userid,
      name: data![0].name,
      email: data![0].email,
      password: data![0].password,
      type: data![0].type,
    };

    const matchPass = compareSync(password, userInformation.password as string);
    if (!matchPass) errors.push({ field: "password", message: "Senha incorreta!" });

    if (errors.length) return res.status(400).send({ errors });

    const token = sign(userInformation, SECRET_KEY as string, { expiresIn: "1d" });

    delete userInformation.password;
    return res.status(200).send({ userInformation, token });
  } catch (err: any) {
    return res.status(500).send({ error: { message: err.message } });
  }
}
