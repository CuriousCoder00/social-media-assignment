import { Request, RequestHandler, Response } from "express";
import Post from "../schemas/post.schema";
import User from "../schemas/user.schema";

export const LikePost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        const user = await User.findById(req.user?.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (post.likes.includes(user._id)) {
            res.status(400).json({ message: "Post already liked" });
            return;
        }
        post.likes.push(user._id);
        await post.save();
        res.status(200).json(post);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}