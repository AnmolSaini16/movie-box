import { Response } from "express";

const responseWithData = (res: Response, statusCode: number, data: any) =>
  res.status(statusCode).json(data);

const error = (res: Response) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something worng!",
  });

const ok = (res: Response, data: any) => responseWithData(res, 200, data);

const created = (res: Response, data: any) => responseWithData(res, 201, data);

const unauthorize = (res: Response) =>
  responseWithData(res, 401, {
    status: 401,
    message: "Unathorized",
  });

const notfound = (res: Response) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource not found",
  });

const badrequest = (res: Response, message: string) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

export default {
  error,
  ok,
  badrequest,
  created,
  unauthorize,
  notfound,
};
