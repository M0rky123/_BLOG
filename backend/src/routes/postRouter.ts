import { Router } from "express";
import { getPosts } from "../controllers/PostController";

const postRouter = Router();

postRouter.route("/").get(getPosts).post(); // TODO: postPost
postRouter.route("/:slug").get().put().delete(); // TODO: getPost, putPost, deletePost
postRouter.route("/:slug/like").post(); // TODO: likePost
postRouter.route("/:slug/dislike").post(); // TODO: dislikePost

export default postRouter;
