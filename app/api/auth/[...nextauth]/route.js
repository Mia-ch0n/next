import { connectToDB } from "../../../../utils/databse";
import NextAuth from "next-auth";
import User from "@models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {};

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
          const isAdmin = user.hasOwnProperty("isAdmin") && user.isAdmin;
          const role = isAdmin ? "admin" : "user";
          // step  0
          return { email: user.email, role: role };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    // step 1
    jwt({ token, user }) {
      if (user) token.role = user.role;
      console.log({ token });
      return token;
    }, // step 2
    async session({ session, token, user }) {
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
