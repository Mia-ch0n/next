import { connectToDB } from "../../../../utils/databse";
import NextAuth from "next-auth";
import User from "@models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectToDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          const isAdmin = user.isAdmin || false;
          const isSuperAdmin = user.isSuperAdmin || false;
          const role = isSuperAdmin ? "superadmin" : isAdmin ? "admin" : "user";

          return { email: user.email, role: role, id: user._id };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;

      return session;
    },
  },
  pages: {
    signIn: "/signIn",
    signOut: "signIn",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };
