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

const allowedOrigins = [
  "http://localhost:5173",
  "https://sensational-dasik-1d8ae5.netlify.app",  // replace with actual Netlify URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
