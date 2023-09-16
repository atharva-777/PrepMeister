import { api } from "@/app/config/axios";
import AuthService from "@/app/services/auth.service";
import { AxiosError } from "axios";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = AuthService.login(
            {email:credentials?.email,
            password:credentials?.password}
          );
          return res;
        } catch (err:any) {
          if (err instanceof AxiosError) {
            throw new Error(err.response?.data.error.message);
          } else {
            throw new Error(err);
          }
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
