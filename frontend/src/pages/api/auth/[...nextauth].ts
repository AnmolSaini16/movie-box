import axios, { AxiosError } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "SignInCredentials",
      id: "sign-in",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "email", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch("http://localhost:5000/api/auth/signin", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (res?.ok) {
          return user;
        }

        if (!res?.ok && res?.status === 400) {
          throw new Error(user.message);
        }

        return null;
      },
    }),
    CredentialsProvider({
      name: "SignUpCredentials",
      id: "sign-up",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "email", type: "password" },
        name: { label: "name", type: "text" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
          name: credentials?.name,
        };

        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (res?.ok) {
          return user;
        }

        if (!res?.ok && res?.status === 400) {
          throw new Error(user.message);
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
