import express, { type Request, type Response } from "express"

const router = express.Router()

router.post("/chat", (_req: Request, res: Response) => {
    res.status(501).json({ error: "AI chat is not configured yet." })
})

router.post("/image", (_req: Request, res: Response) => {
    res.status(501).json({ error: "AI image generation is not configured yet." })
})

router.post("/video", (_req: Request, res: Response) => {
    res.status(501).json({ error: "AI video generation is not configured yet." })
})

router.post("/files", (_req: Request, res: Response) => {
    res.status(501).json({ error: "AI file processing is not configured yet." })
})

export default router