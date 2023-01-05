import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";
import dbConnect from "../../../lib/database/dbConnect";
import { compare } from "bcryptjs";

export default NextAuth({
  //Configure JWT
  session: {
    // { // @ts-ignore}
    jwt: true,
  },
  //Specify Provider
  providers: [
    // { // @ts-ignore}
    Providers.Credentials({
      async authorize(credentials: { email: any; passowrd: string }) {
        //Connect to DB
        const db = await await dbConnect();
        //Get all the users
        const users = await db.collection("users");
        //Find user with the email
        const result = await users.findOne({
          email: credentials.email,
        });
        //Not found - send error res
        if (!result) {
          db.close();
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.passowrd,
          result.passowrd
        );
        //Incorrect password - send response
        if (!checkPassword) {
          db.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        db.close();
        return { email: result.email };
      },
    }),
  ],
});
