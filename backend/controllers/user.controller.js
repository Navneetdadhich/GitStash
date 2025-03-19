import dotenv from "dotenv";
import User from "../models/user.model.js";
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
            headers: { Authorization: `Bearer ${GITHUB_API_KEY}`,
            // 'Accept': 'application/vnd.github.v3+json' 
        },
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


export const likeProfile = async (req, res) => {
    try {
        const {username} = req.params;
        const user = await User.findById(req.user._id.toString());

        console.log(user, "auth user");

        const userToLike = await User.findOne({ username});

        if(!userToLike){
            return res.status(404).json({error: "user is not a member"});
        }

        if(user.likedProfiles.includes(userToLike.username)){
            return res.status(400).json({ error: "User already liked" });
        }
        
        userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
		user.likedProfiles.push(userToLike.username);

        // await userToLike.save();
        // await user.save();

        await Promise.all([userToLike.save(), user.save()]);

        res.status(200).json({ message: "User liked" });

    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

export const getLikes = async (req, res) => {
	try {
		const user = await User.findById(req.user._id.toString());
		res.status(200).json({ likedBy: user.likedBy });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};