import { Router } from "express";
import { fetchAllUsers } from "../controllers/user.controller";

/**
 * User router
 * @description User routes
 * @route /api/v1/users
 * @type Router
 */

const userRouter: Router = Router();

// Fetch all users route
userRouter.get("/", fetchAllUsers);

export default userRouter;