import express from "express";
import { type Request, type Response } from "express";

const router = express.Router();

router.post("/login", (_req: Request, res: Response) => {
    res.send("Login route");
});

router.post("/logout", (_req: Request, res: Response) => {
    res.send("Logout route");
});

router.post("/forgot-password", (_req: Request, res: Response) => {
    res.send("Forgot password route");
});

router.post("/register", (_req: Request, res: Response) => {
    res.send("Register route");
});

export default router;
