import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";
import { User } from "@/models/user";

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password", placeholder: "123" }
        },
        async authorize(credentials: any) {
            console.log(credentials);

            const username = credentials.username;
            const password = credentials.password;

            // validate the credentials
            const user = await User.findOne({
                email: username,
                password: password
            })

            // const user = await prisma.findOne({
            //     where : {
            //         username: username,
            //         password: password
            //     }
            // })

            // if(!user) {
            //     return null; // if null is returned this mean the user has wrong credeadentials
            // }

            return {
                id: "user1",
                name: "Arslan",
                email: credentials.username
            }
          }
        }),
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
                  verified: true,
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
