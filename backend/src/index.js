import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload";
import path from "path";

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';


dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req object => req.auth
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    }
}))

// Route for users
app.use("/api/users", userRoutes);

// Route for authentication
app.use("/api/auth", authRoutes);

// Route for admin
app.use("/api/admin", adminRoutes);

// Route for songs
app.use("/api/songs", songRoutes);

// Route for albums
app.use("/api/albums", albumRoutes);

// Route for stats
app.use("/api/stats", statRoutes);

// error handler
ap.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal servor error" : err.message });
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})