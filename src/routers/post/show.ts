import { NextFunction, Request, Response, Router } from "express";
import Post from "src/models/post";

const router = Router();

router.get("/api/post/show/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if(!id){
        const allPosts = await Post.find();
        return res.status(200).send(allPosts);
    }

    let post;
    try {
        post = await Post.findOne({ _id:id }).populate('comments');
    } catch (err) {
        next(new Error("Post not found!"));
    }
    res.status(200).send(post);
})

export { router as showPostRouter }