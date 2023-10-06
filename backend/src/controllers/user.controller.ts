import { Response } from "express";
import responseHandler from "../handlers/response.handler";
import { IUserInfoInRequest } from "../interface";
import prisma from "../prisma";

export const getUserInfo = async (req: IUserInfoInRequest, res: Response) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: req.user?.id } });

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, {
      name: user.name,
      email: user.email,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};
