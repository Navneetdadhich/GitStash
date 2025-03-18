export const fetchGitHubGraph = async (username) => {
    if (!username) return null;
    
    try {
        const response = await fetch(`/api/github/contributions/${username}`);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub contributions');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        return null;
    }
};