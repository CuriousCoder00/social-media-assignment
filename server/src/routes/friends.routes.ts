import { Router } from "express";
import { fetchAllFriends } from "../controllers/friends.controller";
import { addFriend, removeFriend } from "../controllers/friends.controller";
import { middleware } from "../lib/middleware";

/**
 * Friends router
 * @description Friends routes
 * @route /api/v1/friends
 * @type Router
 */
const friendsRouter: Router = Router();

// Fetch all friends route
friendsRouter.get("/", middleware, fetchAllFriends);

// Add friend route
friendsRouter.post("/:friendId", middleware, addFriend);

// Remove friend route
friendsRouter.delete("/:friendId", middleware, removeFriend);

export default friendsRouter;