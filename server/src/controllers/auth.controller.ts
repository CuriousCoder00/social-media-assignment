import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../schemas/user.schema";

import { JWT_EXPIRATION, JWT_SECRET } from "../lib/config";

/**
 * Registration controller
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 * @type Controller
 * @statusCodes 201 - User created
 * @statusCodes 400 - User already exists
 * @statusCodes 500 - Server error
 */

export const registrationController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get email, password, and name from the request body
        const { email, password, name } = req.body;
        // Check if the user already exists
        const candidate = await User.findOne({ email });
        // If the user exists, return a 400 status code
        if (candidate) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const user = new User({ email, password: hashPassword, name });
        // Save the user
        await user.save();
        // Return a 201 status code
        res.status(201).json({ message: "User created" });
        return;
    } catch (error) {
        // Log the error
        console.error(error);
        // Return a 500 status code
        res.status(500).json({ message: "Server error" });
        return;
    }
};

/**
 * Login controller
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Login a user
 * @route POST /api/v1/auth/login
 * @access Public
 * @type Controller
 * @statusCodes 200 - User logged in
 * @statusCodes 400 - Invalid credentials
 * @statusCodes 500 - Server error
 */
export const loginController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get email and password from the request body
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        // If the user does not exist, return a 400 status code
        if (!user) {
            res.status(400).json({ message: "Invalid credentials." });
            return;
        }
        // Compare the password
        const validPassword = bcrypt.compareSync(password, user.password);
        // If the password is invalid, return a 400 status code
        if (!validPassword) {
            res.status(400).json({ message: "Invalid credentials." });
            return;
        }
        // Create a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        // Return the token
        res.json({ token });
        return;
    } catch (error) {
        console.error(error);
        // Return a 500 status code
        res.status(500).json({ message: "Server error" });
        return;
    }
}