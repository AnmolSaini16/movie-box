import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      name: string;
      token: string;
      exp: number;
      iat: number;
    };
  }
}
