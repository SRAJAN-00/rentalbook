import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          console.log("Attempting to connect to MongoDB...");
          await connectDB();
          console.log("MongoDB connected successfully");

          console.log("Looking for user with email:", credentials.email);
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          console.log("User found, checking password...");
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          console.log("Authentication successful for user:", user.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          console.error(
            "Error stack:",
            error instanceof Error ? error.stack : "No stack available"
          );
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", {
        user,
        account: account?.provider,
        profile,
      });

      if (account?.provider === "google") {
        try {
          await connectDB();

          // Check if user exists
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            console.log("Creating new user for Google OAuth");
            // Create new user for Google OAuth
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              googleId: account.providerAccountId,
              image: user.image,
              preferences: {
                favoriteGenres: [],
                location: "",
              },
              rentalHistory: [],
              wishlist: [],
            });
            console.log("New user created:", existingUser._id);
          } else if (!existingUser.googleId) {
            console.log("Linking existing user with Google account");
            // Link existing user with Google account
            existingUser.googleId = account.providerAccountId;
            existingUser.image = user.image;
            await existingUser.save();
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback:", {
        token: !!token,
        user: !!user,
        account: account?.provider,
      });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback:", { session: !!session, token: !!token });
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
