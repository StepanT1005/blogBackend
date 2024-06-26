import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import { upload } from "./utils/file-upload";
import routes from "./routes/index";
import checkAuth from "./middleware/checkAuth";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import { validateFile } from "./middleware/file-validation";
import path from "path";
dotenv.config();

connectDatabase();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development purposes
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["my-custom-header"], // Custom headers
    credentials: true, // Allow cookies and other credentials
  },
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

//// only for test, in production env need to change
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/api/uploads", express.static(path.join(__dirname, "..", "uploads")));

console.log("__dirname points to:", __dirname);
console.log("Static files served from:", path.join(__dirname, "uploads"));

app.post(
  "/api/upload",
  checkAuth,
  upload.single("image"),
  validateFile,
  (req, res) => {
    const url = `uploads/${req?.file?.filename}`;
    res.json({
      url: `${url}`,
    });
  }
);

app.use("/api", routes);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});

  socket.on("joinPost", (postId) => {
    socket.join(postId);
  });

  socket.on("newComment", (comment) => {
    io.to(comment.post).emit("commentAdded", comment);
  });

  socket.on("leavePost", (postId) => {
    socket.leave(postId);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

server.on("error", (err) => {
  console.error("Failed to start the server:", err);
});
