import { connectToDB } from "../../../../utils/databse";
import NextAuth from "next-auth";
import User from "@models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const authOptions = {
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
      
          // Check for presence of `isAdmin` field and assign role accordingly
          const isAdmin = user.hasOwnProperty('isAdmin') && user.isAdmin;
          const role = isAdmin ? 'admin' : 'user';
      
          return { ...user, role };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/feed",
    signOut: "signIn",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
