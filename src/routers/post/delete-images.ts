import { NextFunction, Request, Response, Router } from "express";
import Post from "../../models/post";

const router = Router();

router.delete("/post/:id/delete/images", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { imagesId } = req.body;

    const post = await Post.findOneAndUpdate({ _id: id },
            { $pull: { images: { _id: { $in: imagesId } } } }, { new: true }
        );

    res.status(201).send(post);
})

export { router as deleteImagesRouter }