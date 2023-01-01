import { NextFunction, Request, Response, Router } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment"

const router = Router();

interface CustomError extends Error {
    status?: number
}

router.delete("/api/comment/:commentId/delete/:postId", async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;
    if(!postId || !commentId){
        const error = new Error('post id and comment id are required!') as CustomError
        error.status = 404
        next(error);
    }

    try {
        await Comment.findOneAndRemove({ _id: commentId })
    } catch (err) {
        next(new Error("comment cannot be deleted!"))
    }

    await Post.findByIdAndUpdate({ _id: postId }, { $pull: { comments: commentId } })
    res.status(201).json({ success: true })
})

export { router as deleteCommentRouter }