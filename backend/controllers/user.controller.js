import dotenv from "dotenv";
// import fetch from "node-fetch"; // Required for Node.js

dotenv.config(); // Load environment variables

// require('dotenv').config();

export const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params;
    const GITHUB_API_KEY =  "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";

    /*console.log("GitHub API Key:", GITHUB_API_KEY); // Debugging log*/

    try {
        if (!GITHUB_API_KEY) {
            console.error("GitHub API key is missing");
            return res.status(500).json({ error: "GitHub API key is missing" });
        }

        // Fetch User Profile
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: { Authorization: `token ${GITHUB_API_KEY}` },
        });

        if (!userRes.ok) throw new Error(`GitHub User API error: ${userRes.status}`);

        const userProfile = await userRes.json();

        if (!userProfile.repos_url) throw new Error("User profile does not contain a repos_url");

        // Fetch User Repositories
        const repoRes = await fetch(userProfile.repos_url, {
            headers: { Authorization: `token ${GITHUB_API_KEY}` },
        });

        if (!repoRes.ok) throw new Error(`GitHub Repos API error: ${repoRes.status}`);

        const repos = await repoRes.json();

        res.status(200).json({ userProfile, repos });

    } catch (error) {
        console.error("Error fetching GitHub data:", error.message);
        res.status(500).json({ error: error.message });
    }
};
