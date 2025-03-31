import { Router } from "express";
import { deletePost, dislikePost, getPost, getPosts, likePost, postPost, putPost } from "../controllers/PostController";
import isThePostAuthorOrAdmin from "../middlewares/isThePostAuthorOrAdmin";

const postRouter = Router();

postRouter.route("/").get(getPosts).post(isThePostAuthorOrAdmin(), postPost);
postRouter.route("/:slug").get(getPost).put(isThePostAuthorOrAdmin(), putPost).delete(isThePostAuthorOrAdmin(), deletePost);
postRouter.route("/:slug/like").post(likePost);
postRouter.route("/:slug/dislike").post(dislikePost);

export default postRouter;
