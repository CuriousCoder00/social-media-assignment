import { Router } from 'express';
import { loginController, registrationController } from '../controllers/auth.controller';

/**
 * Auth router
 * @description Auth routes
 * @route /api/v1/auth
 * @type Router
 */
const authRouter = Router();

// Register and login routes
authRouter.post('/register', registrationController)
authRouter.post('/login', loginController)

export default authRouter;