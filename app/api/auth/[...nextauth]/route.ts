import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email" },
        password: { label: "Password", type: "your-password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.password || !credentials.email)
          return null;
        const { email, password } = credentials;
        connect();
        const user = await User.findOne({ email });
        if (!user) {
          return null;
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
          return null;
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("jwt callback ",{token,user,session})
      if (user) {
        return {
          ...token,
          id: user.id,
          idd:token.sub,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session callback ",{session,token,user})
      return {
        ...session,
        user:{
          ...session.user,
          id: token.sub,
        }
      };
      // return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret:process.env.NEXTAUTH_SECRET,

  pages: {
    // signIn:'/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
