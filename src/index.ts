import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import { upload } from "./utils/file-upload";
import routes from "./routes/index";
import checkAuth from "./middleware/checkAuth";
dotenv.config();

connectDatabase();

const app: Application = express();

app.use(express.json());
app.use(cors());

// app.use(compression())
// app.use(cookieParser())
// app.use(bodyParser.json())

app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req?.file?.originalname}`,
  });
});

app.use(routes);

const port = process.env.PORT || 4444;
const server = app.listen(port || 4444, () => {
  console.log(`Server started on port ${port}`);
});

server.on("error", (err) => {
  console.error("Failed to start the server:", err);
});
