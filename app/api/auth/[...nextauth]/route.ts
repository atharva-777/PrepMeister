import { AuthOptions } from "next-auth";
import { api } from "@/app/config/axios";
import { AxiosError } from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import AuthService from "@/app/services/auth.service";

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
      async authorize(credentials, req) {
        try {
          const res = await AuthService.login({
            identifier: credentials?.email,
            password: credentials?.password,
          });

          const { data } = await api.get("", {
            headers: {
              Authorization: `Bearer ${res.data.jwt}`,
            },
          });
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
      return Promise.resolve({ ...token, ...user });
    },
    session: ({ session, token, user }) => {
      session.user.data = {
        id: token.id,
        username: token.username,
        email: token.email!!,
      };
      session.user.token = token.jwt;
      return Promise.resolve(session);
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

// import AuthService from "@/app/services/auth.service";
// import { AxiosError } from "axios";
// import NextAuth from "next-auth";
// import type { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         try {
//           const res = AuthService.login(
//             {email:credentials?.email,
//             password:credentials?.password}
//           );
//           console.log(res)
//           return res;
//         } catch (err:any) {
//           if (err instanceof AxiosError) {
//             throw new Error(err.response?.data.error.message);
//           } else {
//             throw new Error(err);
//           }
//         }
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true,
//   pages: {
//     signIn: '/login',
//   }
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
