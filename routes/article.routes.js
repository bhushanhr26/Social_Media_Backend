import express from "express";
import {
  deleteArticleByID,
  getAllArticles,
  getArticleById,
} from "../controllers/article.controller.js";

const router = express.Router();

router.get("/getAllArticle", getAllArticles);
router.get("/getArticleById/:_id", getArticleById);
router.delete("/deleteArticleById/:_id", deleteArticleByID);

export default router;
