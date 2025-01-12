import { Request, RequestHandler, Response } from "express";
import User from "../schemas/user.schema";

/**
 * Add friend
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Add friend
 * @route POST /api/v1/friends/:friendId
 * @access Public
 * @type Controller
 * @statusCodes 200 - Friend added
 * @statusCodes 400 - Already friends
 * @statusCodes 404 - User or friend not found
 * @statusCodes 500 - Server error
 */
export const addFriend: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch the user by id
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(404).json({ message: "User not found" });
            return
        }
        const user = await User.findById(user_id);
        // Fetch the friend by id
        const friend = await User.findById(req.params.friendId);
        // Check if the user and friend exist
        if (!user || !friend) {
            res.status(404).json({ message: "User or friend not found" });
            return
        }
        // Check if the user is already friends with the friend
        if (user.friends.includes(friend._id)) {
            res.status(400).json({ message: "Already friends" });
            return
        }
        // Add the friend to the user's friends list
        user.friends.push(friend._id);
        // Save the user
        await user.save();
        // Return a 200 status code
        res.status(200).json(user);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}

/**
 * Remove friend
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Remove friend
 * @route DELETE /api/v1/friends/:friendId
 * @access Public
 * @type Controller
 * @statusCodes 200 - Friend removed
 * @statusCodes 400 - Not friends
 * @statusCodes 404 - User or friend not found
 * @statusCodes 500 - Server error
 */
export const removeFriend: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch the user by id
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(404).json({ message: "User not found" });
            return
        }
        const user = await User.findById(user_id);
        // Fetch the friend by id
        const friend = await User.findById(req.params.friendId);
        // Check if the user and friend exist
        if (!user || !friend) {
            res.status(404).json({ message: "User or friend not found" });
            return
        }
        // Check if the user is not friends with the friend
        if (!user.friends.includes(friend._id)) {
            res.status(400).json({ message: "Not friends" });
            return
        }
        // Remove the friend from the user's friends list
        user.friends = user.friends.filter((friend_id) => friend_id.toString() !== friend._id.toString());
        // Save the user
        await user.save();
        // Return a 200 status code
        res.status(200).json(user);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}

/**
 * Fetch all friends
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Fetch all friends
 * @route GET /api/v1/friends
 * @access Public
 * @type Controller
 * @statusCodes 200 - Friends fetched
 * @statusCodes 404 - User not found
 * @statusCodes 500 - Server error
 */
export const fetchAllFriends: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch the user by id
        const user_id = req.user?.id;
        const user = await User.findById(user_id).populate("friends");
        // Check if the user exists
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return
        }
        // Return a 200 status code
        res.status(200).json(user.friends);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}

