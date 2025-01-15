import { Router } from "express";
import { fetchAllUsers, getFriendsOfUser, getUserById, getUserByUsername } from "../controllers/user.controller";
import { middleware } from "../lib/middleware";

/**
 * User router
 * @description User routes
 * @route /api/v1/users
 * @type Router
 */

const userRouter: Router = Router();

// Fetch all users route
userRouter.get("/", middleware, fetchAllUsers);
userRouter.get("/:id", middleware, getUserById);
userRouter.get("/username/:username", getUserByUsername);
userRouter.get("/:_id/friends", middleware, getFriendsOfUser);

export default userRouter;