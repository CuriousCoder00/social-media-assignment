import express from 'express';
import bodyParser from 'body-parser';

import { PORT } from './lib/config';
import { db } from './lib/db';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';

// Connect to the database
db();

// Create an Express app
const app = express();

// Use the Express JSON parser
app.use(express.json());
// Use the Express URL-encoded parser
app.use(express.urlencoded({ extended: true }));
// Use the body parser
app.use(bodyParser.json());

// Use the auth router
app.use("/api/v1/auth", authRouter)

app.use("/api/v1/users", userRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (error) => {
    console.error('Error starting server: ', error);
});
