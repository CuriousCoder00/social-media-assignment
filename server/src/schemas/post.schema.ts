import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = model("Post", PostSchema);
export default Post;