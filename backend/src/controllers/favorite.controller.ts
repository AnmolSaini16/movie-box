import { Response } from "express";
import { IUserInfoInRequest } from "../interface";
import prisma from "../prisma";
import responseHandler from "../handlers/response.handler";

export const addToFavorite = async (req: IUserInfoInRequest, res: Response) => {
  try {
    const { movieId } = req.body;
    const isFavorite = await prisma.favorite.findFirst({
      where: {
        userId: req.user?.id,
        movieId,
      },
    });
    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = await prisma.favorite.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.user?.id,
          },
        },
      },
    });

    responseHandler.created(res, favorite);
  } catch (error) {
    responseHandler.error(res);
  }
};

export const removeFavorite = async (
  req: IUserInfoInRequest,
  res: Response
) => {
  try {
    const { movieId } = req.body;

    const favorite = await prisma.favorite.findFirst({
      where: { movieId, userId: req.user?.id },
    });

    if (!favorite) return responseHandler.notfound(res);

    await prisma.favorite.delete({
      where: { movieId, userId: req.user?.id },
    });

    responseHandler.ok(res, {});
  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};

export const getAllFavorites = async (
  req: IUserInfoInRequest,
  res: Response
) => {
  try {
    const userFavorites = await prisma.favorite.findMany({
      where: { userId: req.user?.id },
      orderBy: { createdAt: "asc" },
    });

    responseHandler.ok(res, userFavorites);
  } catch (error) {
    responseHandler.error(res);
  }
};
