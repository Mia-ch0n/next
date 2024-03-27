import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ email, password }) {
      try {
       
        const user = await User.findOne({ email });

  
        if (!user || !comparePassword(password, user.password)) {
          return false;
        }

       
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; 
      }
    },
  },
});

// Helper function to compare passwords securely
function comparePassword(password, hash) {
  // Implement your password comparison logic here
  // For example, you can use bcrypt.compareSync if you're using bcrypt for password hashing
}

export default handler;
