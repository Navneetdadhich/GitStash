import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import path from "path"
import passport from "passport";
import session from "express-session";
// import path from "path";
import "./passport/github.auth.js"
// ... existing imports ...
import githubRoutes from './routes/github.js';

// ... existing middleware ...
// ... rest of your server code ...
dotenv.config();



import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"
import authRoutes from "./routes/auth.route.js"
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
const PORT = process.env.PORT  || 5000;
const __dirname = path.resolve();

console.log(__dirname);

app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// app.use(cors());

app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,  
}));

// app.get("/", (req,res) => {
//     res.send("server is ready");
// });

app.use('/api/github', githubRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/repository", exploreRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
    connectMongoDB();
});
