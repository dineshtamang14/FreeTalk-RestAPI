import { NextFunction, Request, Response, Router } from "express";
import Post, { PostDoc } from "../../models/post";
import Comment from "../../models/comment"
import { BadRequestError } from "../../../common";

const router = Router();

router.delete("/api/comment/:commentId/delete/:postId", async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;
    if(!postId || !commentId){
        return next(new BadRequestError('post id and comment id are required!'))
    }

    try {
        await Comment.findOneAndRemove({ _id: commentId })
    } catch (err) {
        next(new BadRequestError("comment cannot be deleted!"))
    }

    const post: PostDoc | null = await Post.findByIdAndUpdate({ _id: postId }, { $pull: { comments: commentId } }, { new: true });
    if(!post) return next(new Error());
    res.status(201).send(post)
})

export { router as deleteCommentRouter }