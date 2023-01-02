import * as dotenv from "dotenv"
dotenv.config();
import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieSession from "cookie-session";
import { 
    newPostRouter, 
    showPostRouter, 
    showAllPostRouter,
    updatePostRouter, 
    deletePostRouter,
    newCommentRouter,
    deleteCommentRouter,
    signupRouter,
    signinRouter,
    signoutRouter,
    currentUserRouter,
    addImagesRouter,
    deleteImagesRouter
} from "./routers/index"
import { NotFoundError, currentUser, errorHandler, requireAuth } from "../common";

const app = express()

// middleware
app.set('trust proxy', true);
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieSession({
    signed: false,
    secure: false
}))

// all the routers
app.use(currentUser)

// auth routes
app.use(signupRouter)
app.use(signinRouter);
app.use(currentUserRouter)
app.use(signoutRouter)

// post routes
app.use(requireAuth, newPostRouter);
app.use(showPostRouter);
app.use(showAllPostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, addImagesRouter);
app.use(requireAuth, deleteImagesRouter);

// comment routes
app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

// for unknow path
app.use("*", (req, res, next) => {
    return next(new NotFoundError());
})

// global interface
// declare global {
//     interface CustomError extends Error {
//         status?: number
//     }
// }

// app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
//     if(error.status){
//         return res.status(error.status).json({ message: error.message })
//     }
//     return res.status(500).json({ message: "something went wrong!" })
// })

app.use(errorHandler);

export { app }