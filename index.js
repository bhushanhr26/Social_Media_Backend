import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import articleRoutes from "./routes/article.routes.js";
import createArticle from "./controllers/article.controller.js";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dne1kwwfa', 
  api_key: '936511388659311', 
  api_secret: '7u3B5KTghLHDGoC7CcfT1BXFhdE' 
});

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const username = encodeURIComponent("bhushanHr26");
const password = encodeURIComponent("7739625372@Bhu");
const DB = `mongodb+srv://${username}:${password}@cluster0.mi18rii.mongodb.net/social_media?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5001;
app.use(userRoute);
app.use(articleRoutes);
app.use("/", createArticle);

mongoose
  .connect(DB, {})
  .then((res) => {
    app.listen(PORT, () => console.log(`DB Connected on port : ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.send(`Hello world From Index.js file from Server ${PORT}`);
});
