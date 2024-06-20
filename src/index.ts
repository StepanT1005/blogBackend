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
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["my-custom-header"], // Custom headers
    credentials: true, // Allow cookies and other credentials
  },
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req?.file?.originalname}`,
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

const port = process.env.PORT || 4444;
server.listen(port || 4444, () => {
  console.log(`Server started on port ${port}`);
});

server.on("error", (err) => {
  console.error("Failed to start the server:", err);
});
