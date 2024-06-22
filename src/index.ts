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

app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  console.log(req.file?.filename);
  const url = `uploads/${req?.file?.filename}`;
  res.json({
    url: `${url}`,
  });
});

app.use(routes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("joinPost", (postId) => {
    socket.join(postId);
    console.log(`User joined room for post ${postId}`);
  });

  socket.on("newComment", (comment) => {
    console.log(`New comment on post ${comment.post}`);
    io.to(comment.post).emit("commentAdded", comment);
    console.log(`Emitted commentAdded for post ${comment.post}`);
  });

  socket.on("leavePost", (postId) => {
    socket.leave(postId);
    console.log(`User left room for post ${postId}`);
  });
});
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

server.on("error", (err) => {
  console.error("Failed to start the server:", err);
});
