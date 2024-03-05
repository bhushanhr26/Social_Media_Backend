import express from "express";
import {
  createUser,
  deleteUserById,
  getUserId,
  updateUserById,
} from "../controllers/User.controller.js";

const router = express.Router();

router.post("/createUser", createUser);
router.delete("/deleteById/:_id", deleteUserById);
router.get("/getUserById/:_id", getUserId);
router.put("/updateUserById/:_id", updateUserById);

export default router;
