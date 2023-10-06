import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler";
import bcrypt from "bcrypt";
import prisma from "../prisma";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const checkEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (checkEmail) {
      return responseHandler.badrequest(res, "Email already in use");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET!,
      { expiresIn: "24h" }
    );

    return responseHandler.created(res, {
      token,
      name: user.name,
      email: user.email,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) return responseHandler.badrequest(res, "User not found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return responseHandler.badrequest(res, "Incorrect password");

    // Valid User
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET!,
      { expiresIn: "24h" }
    );

    return responseHandler.created(res, {
      token,
      name: user.name,
      email: user.email,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};
