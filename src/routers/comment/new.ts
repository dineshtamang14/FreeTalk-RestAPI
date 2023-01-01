import { NextFunction, Request, Response, Router } from "express";
import Comment from "../../models/comment";
import Post from "../../models/post";

const router = Router();

router.post("/api/comment/new/:postId", async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { userName, content } = req.body;
    if(!content){
        const error = new Error("conent is required!") as CustomError;
        error.status = 400;
        next(error);
    }

    const newComment = new Comment({
        userName: userName ? userName : "anonymous",
        content
    });
    await newComment.save();
    const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment } },
        { new: true }
    ).populate('comments')
    res.status(201).send(updatedPost);
});

export { router as newCommentRouter }