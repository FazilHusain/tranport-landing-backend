import express from "express";
import bodyParser from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import formRoutes from "./src/routes/formRoutes.js";
import authRouter from "./src/routes/auth.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",  // Allow frontend's origin
    // methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"], // Allow methods including PATCH
    credentials: true,  // Allow credentials (cookies) to be sent with the request
  })
);

app.use(express.json());
app.use(cookieParser());
// home testing route
//app.get("/", (req, res) => res.json({ messge: "This is home route" }));
app.use("/", authRouter);
app.use("/", formRoutes);

const port = 3000;


connectDb()
  .then(() => {
    console.log("MongoDB Connected Succesfully");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => console.log(err));
