import express from "express";
import { type Request, type Response } from "express";

const router = express.Router();

router.get("/login", (res: Response, req: Request) => {
    res.send("Login route");
});

router.post("/logout", (res: Response, req: Request) => {
    res.send("Logout route");
});

router.post("/forgot-password", (res: Response, req: Request) => {
    res.send("Forgot password route");
});

router.post("/register", (res: Response, req: Request) => {
    res.send("Register route");
});

