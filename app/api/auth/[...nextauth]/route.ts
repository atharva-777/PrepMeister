import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email" },
        password: { label: "Password", type: "your-password" },
      },
      async authorize(credentials, req) {
        if(!credentials || !credentials.password || !credentials.email)return null;
        const {email,password} = credentials;
    
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

  pages:{
    // signIn:'/login',
  }
};

const handler = NextAuth(authOptions);
export {handler as GET,handler as POST};