import mongoose from "mongoose";
import TagScheme from "../schemas/TagScheme";

const TagModel = mongoose.model("Tag", TagScheme);

export default TagModel;
