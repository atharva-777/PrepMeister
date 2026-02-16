import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email" },
        password: { label: "Password", type: "password", placeholder: "your-password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.error("NextAuth: Missing credentials");
          return null;
        }

        const { email, password } = credentials;
        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

        try {
          // Call our own API route (same origin) so backend is only hit from one place
          const loginUrl = `${baseUrl}/api/users/login`;
          console.log(`NextAuth: Attempting login for ${email} via ${loginUrl}`);

          const response = await fetch(loginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            const errorMessage = data.message || data.error || `Login failed (${response.status})`;
            console.error("NextAuth: Login failed", errorMessage);
            return null;
          }

          const user = data?.user;
          if (!user || !user._id) {
            console.error("NextAuth: Invalid user data in response", data);
            return null;
          }

          console.log("NextAuth: Login successful for user", user._id);
          return {
            id: String(user._id),
            name: user.username || user.name || email,
            email: user.email,
          };
        } catch (error: any) {
          console.error("NextAuth: Authorization error", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "";
        session.user.name = (token.name as string) || null;
        session.user.email = (token.email as string) || null;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Allow sign in if user exists
      return !!user;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",

  pages: {
    signIn: "/login",
    error: "/login",
  },
  
  debug: process.env.NODE_ENV === "development",
  
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("NextAuth: Sign in event", { userId: user?.id, email: user?.email });
    },
    async signOut() {
      console.log("NextAuth: Sign out event");
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
