import { NextFunction, Request, Response, Router } from "express";
import Post from "../../models/post";

const router = Router();

router.get("/api/post/show", async (req: Request, res: Response, next: NextFunction) => {
        const allPosts = await Post.find().populate('comments');
        return res.status(200).send(allPosts);
})

export { router as showAllPostRouter }