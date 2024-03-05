import { config, uploader } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const cloudinary = (req, res, next) => {
  config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });
  next();
};
export default { cloudinary, uploader };
