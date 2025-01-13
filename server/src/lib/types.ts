declare module 'express' {
    interface Request {
        user?: {
            id: string;
            email: string;
        }
    }
}

export interface FriendshipGraph {
    [userId: string]: string[]; // Adjacency list representation of friendships
}