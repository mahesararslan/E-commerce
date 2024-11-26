import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { User } from "@/models/user";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        })
    ],
    callbacks: { //@ts-ignore
        async signIn({ user, profile}) {
          
            console.log("signin called");
            if (!profile || !user.email) {
                console.log("hi signin false");
                return false;
            }
            // console.log(profile.email);
            console.log("User: ", user);
            console.log("Profile: ", profile);

            try {
              // logic to check if user exists in db and if not, create a new user
              const existingUser = await User.findOne({ email: user.email });
              console.log("Existing user:", existingUser);

              if (!existingUser) {
                console.log("User does not exist in the database. Creating a new user...");
                const newUser = await User.create({ // @ts-ignore
                  firstName: profile.given_name || "", // @ts-ignore
                  lastName: profile.family_name || "",
                  email: user.email,
                  googleId: user.id, 
                  image: user.image,
                });
                console.log("New user created:", newUser);
              }

              return true;

            }
            catch (error:any) {
                console.error("Error during sign-in:", error.msg);
                return false;
            }
        },
        async redirect({ url, baseUrl }) {
          
          return baseUrl;
        },
    },
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
};
