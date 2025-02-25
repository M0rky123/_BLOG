import mongoose from "mongoose";
import PostScheme from "../schemas/PostScheme";

const PostRole = mongoose.model("Post", PostScheme);

export default PostRole;
