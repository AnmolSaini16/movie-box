import { Request } from "express";

export interface IUserInfoInRequest extends Request {
  user?: { id: string; name: string; email: string; password: string };
}
