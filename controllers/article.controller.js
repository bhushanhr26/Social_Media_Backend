import articleNewSchema from "../models/article.model.js";
import express from "express";
import moment from "moment";
import path from "path";
import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "article-images", // Optional: Set a specific folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const app = express();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Set the destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Set a unique filename
//   },
// });

const upload = multer({ storage: storage });
const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "./uploads")));

export const getAllArticles = async (req, res) => {
  try {
    let allArticles = await articleNewSchema.find();
    res.status(200);
    res.send(allArticles);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
{
  app.post(
    "/createArticle",
    upload.single("articleImage"),
    async (req, res) => {
      try {
        const {
          articleTitle,
          articleSubHeading,
          authorName,
          articleContent,
          follower,
          following,
          likes,
          _id,
        } = req.body;

        const newBlogPost = new articleNewSchema({
          _id,
          articleTitle,
          articleSubHeading,
          authorName,
          articleContent,
          follower,
          following,
          likes,
          articleImage: req.file.path, // Multer adds the 'file' object to the request
        });

        const savedPost = await newBlogPost.save();
        res.json(savedPost);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );
}

{
  app.put(
    "/updateArticle/:_id",
    upload.single("articleImage"),
    async (req, res) => {
      try {
        const updatedArticleDetails = await articleNewSchema.findByIdAndUpdate(
          req.params._id,
          {
            articleTitle: req.body.articleTitle,
            articleSubHeading: req.body.articleSubHeading,
            authorName: req.body.authorName,
            articleContent: req.body.articleContent,
            follower: req.body.follower,
            following: req.body.following,
            likes: req.body.likes,
            articleImage: req.file?.path,
          },
          {
            new: true,
          }
        );
        res.status(201).json(updatedArticleDetails);
      } catch (err) {
        console.log(err, "err");
        res.status(500).send("server error");
      }
    }
  );
}

export const getArticleById = async (req, res) => {
  const { _id } = req.params;
  try {
    let article = await articleNewSchema.findById(_id);
    const imageUrl = `${req.protocol}://${req.get("host")}/${
      article.articleImage
    }`;
    let newArticle = {
      _id: article._id,
      articleTitle: article.articleTitle,
      articleImage: imageUrl,
      articleSubHeading: article.articleSubHeading,
      authorName: article.authorName,
      articleContent: article.articleContent,
      follower: article.follower,
      following: article.following,
      createdAt: moment(article.createdAt).format("YYYY-MMM-DD HH:mm a"),
      likes: article.likes,
    };
    res.status(200);
    res.send(newArticle);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

export const deleteArticleByID = async (req, res) => {
  const { _id } = req.params;
  try {
    let deleteArticle = await articleNewSchema.findByIdAndDelete({ _id });
    if (!deleteArticle) {
      return res.status(404).json({ msg: "No Article with the given ID" });
    } else {
      res.json({ msg: "Deleted Successfully!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export default app;
