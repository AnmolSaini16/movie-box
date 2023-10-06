import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import responseHandler from "../handlers/response.handler";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { IUserInfoInRequest } from "../interface";

const tokenDecode = (req: Request) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET!);
    }

    return false;
  } catch {
    return false;
  }
};

const checkAuth = async (
  req: IUserInfoInRequest,
  res: Response,
  next: NextFunction
) => {
  const { data } = tokenDecode(req) as JwtPayload;

  if (!data) return responseHandler.unauthorize(res);

  const user = await prisma.user.findFirst({
    where: { id: data },
  });

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { checkAuth, tokenDecode };
