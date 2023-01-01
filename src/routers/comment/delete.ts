import { NextFunction, Request, Response, Router } from "express";
import Post from "../../models/post";
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

    await Post.findByIdAndUpdate({ _id: postId }, { $pull: { comments: commentId } })
    res.status(201).json({ success: true })
})

export { router as deleteCommentRouter }