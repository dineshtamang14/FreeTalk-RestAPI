import { NextFunction, Request, Response, Router } from "express";
import Post from "../../models/post";
import { BadRequestError } from "../../../common";

const router = Router();


router.delete("/api/post/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if(!id){
        return next(new BadRequestError("post id is required"));
    }

    try {
        await Post.findOneAndRemove({ _id: id });
    } catch (err) {
        next(new BadRequestError("post cannot be deleted"));
    }

    res.status(201).json({ success: true })
})

export { router as deletePostRouter }