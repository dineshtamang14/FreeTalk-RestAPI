import { NextFunction, Request, Response, Router } from "express";
import Post from "../../models/post";

const router = Router();


router.delete("/api/post/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if(!id){
        const error = new Error("post id is required") as CustomError;
        error.status = 404;
        next(error);
    }

    try {
        await Post.findOneAndRemove({ _id: id });
    } catch (err) {
        next(new Error("post cannot be deleted"));
    }

    res.status(201).json({ success: true })
})

export { router as deletePostRouter }