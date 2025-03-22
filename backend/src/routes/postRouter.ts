import { Router } from "express";
import { deletePost, dislikePost, getPost, getPosts, likePost, postPost, putPost } from "../controllers/PostController";
import hasRole from "../middlewares/hasRole";
import isThePostAuthorOrAdmin from "../middlewares/isThePostAuthorOrAdmin";

const postRouter = Router();

postRouter.route("/").get(getPosts).post(hasRole("autor"), postPost);
postRouter.route("/:slug").get(getPost).put(hasRole("autor"), putPost).delete(isThePostAuthorOrAdmin(), deletePost);
postRouter.route("/:slug/like").post(likePost);
postRouter.route("/:slug/dislike").post(dislikePost);

export default postRouter;
