import { FriendshipGraph } from "./types";


// Function to find all connection paths
const findConnectionPaths = (
    graph: FriendshipGraph,
    startUserId: string,
    endUserId: string,
    maxDepth: number = 5
): string[][] => {
    const paths: string[][] = [];

    const dfs = (
        currentPath: string[],
        visited: Set<string>,
        depth: number
    ) => {
        const currentUser = currentPath[currentPath.length - 1];

        // Stop if max depth is reached or no further connections
        if (depth > maxDepth || !graph[currentUser]) return;

        // If the current user matches the target user, record the path
        if (currentUser === endUserId) {
            paths.push([...currentPath]);
            return;
        }

        // Traverse neighbors
        for (const neighbor of graph[currentUser]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                dfs([...currentPath, neighbor], visited, depth + 1);
                visited.delete(neighbor); // Backtrack
                // console.log(`Visiting: ${currentUser}, Path: ${currentPath}`);
            }
        }
    };

    // Start DFS from the start user
    dfs([startUserId], new Set([startUserId]), 0);

    return paths;
};

export default findConnectionPaths;