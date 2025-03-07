import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
// import passport from "passport";
// import session from "express-session";
// import path from "path";

import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"
dotenv.config();
const app = express();
app.use(cors());

app.get("/", (req,res) => {
    res.send("server is ready");
});

app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(5000, () => {
    console.log("server started on http://localhost:5000");
});
