import { AuthOptions } from "next-auth";
import { AxiosError } from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import AuthService from "@/app/services/auth.service";
import { api } from "@/app/config/axios";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        try {
          const res = await AuthService.login({
            identifier: credentials?.email,
            password: credentials?.password,
          });
          if (!res) return null;
          return res;
        } catch (err: any) {
          if (err instanceof AxiosError) {
            throw new Error(err.response?.data.error.message);
          } else {
            throw new Error(err);
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };
