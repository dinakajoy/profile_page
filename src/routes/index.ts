import express from "express";
import {
  userValidation,
  validate,
} from "../validations/user.validation";
import {
  getUserController,
  getProfileController,
  profileUpdateController,
} from "../controllers/user.controlller";
const router = express.Router();

/* GET Profile page. */
router.get("/", getUserController);

/* GET Profile-Edit page. */
router.get("/profile/:email", getProfileController);
router.post("/profile", userValidation(), validate, profileUpdateController);

export default router;
