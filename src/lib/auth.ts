import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import { mongooseConnect } from "./mongoose";

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "text", placeholder: "js@example.com" },
            password: { label: "Password", type: "password", placeholder: "123" }
        },
        async authorize(credentials: any) {
            console.log(credentials);
          
            try {
              await mongooseConnect();
              const email = credentials.email;
              const password = credentials.password;

              // validate the credentials
              const user = await User.findOne({
                  email: email,
              })

              if (!user) {
                  return null;
              }
              console.log("User:", user);
              
              const isPasswordValid = await bcrypt.compare(password, user.password);
              
              if (!isPasswordValid) {
                  return null;
              }

              return user;
            }
            catch (error) {
                console.error("Error during authorization:", error);
                return null;
            }
          }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        })
    ],
    callbacks: { //@ts-ignore
        async signIn({ user, profile, account}) {


          if (account && account.provider === "google") {
                console.log("Google signin called");


              if (!profile || !user.email) {
                  console.log("hi signin false");
                  return false;
              }
              // console.log(profile.email);
              // console.log("User: ", user);
              // console.log("Profile: ", profile);

              try {
                await mongooseConnect();
                // logic to check if user exists in db and if not, create a new user
                const existingUser = await User.findOne({ email: user.email });
                // console.log("Existing user:", existingUser);

                if (!existingUser) {
                  // console.log("User does not exist in the database. Creating a new user...");
                  const newUser = await User.create({ // @ts-ignore
                    firstName: profile.given_name || "", // @ts-ignore
                    lastName: profile.family_name || "",
                    email: user.email,
                    googleId: user.id, 
                    image: user.image,
                    verified: true,
                  });
                  // console.log("New user created:", newUser);
                }

                return true;

              }
              catch (error:any) {
                  console.error("Error during sign-in:", error.msg);
                  return false;
              }
          }

          return true; // for all other sign-ins
        },
        async redirect({ url, baseUrl }) {
          
          return baseUrl;
        },
        async jwt({ token, user }) {
            // Add firstName and lastName to the token on sign-in
            if (user) { // @ts-ignore
              token.id = user._id || user.id; // @ts-ignore
              token.firstName = user.firstName || ""; // @ts-ignore
              token.lastName = user.lastName || "";
            }
            return token;
          },
          async session({ session, token }) {
            // @ts-ignore Add firstName and lastName to the session object
            session.user.firstName = token.firstName; // @ts-ignore
            session.user.lastName = token.lastName; // @ts-ignore
            session.user.id = token.id;
            return session;
          },
    },
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
    session: {
        strategy: "jwt",
    },
};
