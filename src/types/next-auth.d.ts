import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      tkn?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    tkn?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    tkn?: string;
  }
}