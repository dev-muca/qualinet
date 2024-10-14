import HttpService from "@/services/http";
import { hashSync } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const errors = [];
  const { name } = req.query;

  if (!name) errors.push({ field: "name", message: "Forneça um nome!" });

  const product = await HttpService.Product.getProductByName({ name: name as string });

  if (errors.length) return res.status(400).send({ errors });

  res.status(200).send({ product });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const errors = [];
  const { name, description, type } = req.body;

  if (!name) errors.push({ field: "name", message: "Forneça um nome!" });
  if (errors.length) return res.status(400).send({ errors });

  const productExists = await HttpService.Product.getProductByName({ name })

  if (productExists?.length! > 0)
    errors.push({ field: "name", message: "Já existe um produto cadastrado com esse nome!" });

  if (errors.length) return res.status(400).send({ errors });

  const register = await HttpService.Product.createProduct({ name, description });

  res.status(200).send({ register });
}
