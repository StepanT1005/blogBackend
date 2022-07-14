import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  authValidation,
  postCreateValidation,
  registerValidation,
} from "./validation.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:1005@cluster0.gymb4o1.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json()); //// for app understand read json format
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  authValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.get("/tags", PostController.getLastTags);
app.get("/commentaries", PostController.getLastComments);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);
app.patch("/posts/:id/comments", PostController.addComment);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server started");
});