import HttpService from "@/services/http";
import { hashSync } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") POST(req, res);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const errors = [];
  const { name, email, password, tryPassword, type } = req.body;

  // empty fields validation
  if (!name) errors.push({ field: "name", message: "Forneça seu nome!" });
  if (!email) errors.push({ field: "email", message: "Forneça seu email!" });
  if (!password) errors.push({ field: "password", message: "Forneça sua senha!" });
  if (!tryPassword) errors.push({ field: "tryPassword", message: "Repita sua senha!" });
  if (password != tryPassword) errors.push({ field: "tryPassword", message: "As senhas são diferentes!" });

  // user already exist validation 
  const userExists = await HttpService.User.getUser(email);
  if (userExists?.length! > 0) errors.push({ field: "email", message: "Já existe um cadastro com esse e-mail!" });

  // send all errors
  if (errors.length) return res.status(400).send({ errors });

  // hash pass and register user
  const hashPass = hashSync(password, 16);
  const register = await HttpService.User.registerUser({ name, email, password: hashPass, type });

  res.status(200).send({ register });
}
