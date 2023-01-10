// import type { NextApiRequest, NextApiResponse } from "next";
// import { MongoClient } from "mongodb";
// import dbConnect from "../../../../lib/database/dbConnect";
// import { hash } from "bcryptjs";
// import Users from "../../../../models/UserSchema";
// type ResponseData = {
//   email: string;
//   password: string;
//   message: string;
// };
// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   //Only POST mothod is accepted
//   if (req.method === "POST") {
//     //Getting email and password from body
//     const { email, password } = req.body;
//     //Validate
//     if (!email || !email.includes("@") || !password) {
//       res.status(422).json({ message: "Invalid Data" });
//       return;
//     }
//     //Connect with database
//     const db = await dbConnect();
//     //Check existing
//     const checkExisting = await db
//       .collection("users")
//       .findOne({ email: email });
//     //Send error response if duplicate user is found
//     if (checkExisting) {
//       res.status(422).json({ message: "User already exists" });
//       db.close();
//       return;
//     }
//     //Hash password
//     const status = await db.collection("users").insertOne({
//       email,
//       password: await hash(password, 12),
//     });
//     //Send success response
//     res.status(201).json({ message: "User created", ...status });
//     //Close DB connection
//     db.close();
//   } else {
//     //Response for other than POST method
//     res.status(500).json({ message: "Route not valid" });
//   }
// }

// export default handler;

 export let fd:string = "dsf";
