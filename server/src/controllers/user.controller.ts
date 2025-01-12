import { Request, RequestHandler, Response } from "express";
import User from "../schemas/user.schema";

/**
 * Fetch all users
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Fetch all users
 * @route GET /api/v1/users
 * @access Public
 * @type Controller
 * @statusCodes 200 - Users fetched
 * @statusCodes 500 - Server error
 */
export const fetchAllUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all users
        // Select all fields except the password
        const users = await User.find().select("-password");
        // Return a 200 status code
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * Get user by id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Get user by id
 * @route GET /api/v1/users/:id
 * @access Public
 * @type Controller
 * @statusCodes 200 - User fetched
 * @statusCodes 500 - Server error
 */
export const getUserById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch user by id
        const user = await User.findById(req.params.id).select("-password");
        // Return a 200 status code
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}