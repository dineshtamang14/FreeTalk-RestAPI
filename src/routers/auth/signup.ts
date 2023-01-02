import { NextFunction, Request, Response, Router } from "express";
import User from "../../models/user"
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../../common";

const router = Router();

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(user) return next(new BadRequestError('user with that email already exists!'));

    const newUser = User.build({ email, password });
    await newUser.save();

    req.session = {
        jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!, { expiresIn: '1h' })
    }

    res.status(201).send(newUser);
})

export { router as signupRouter }