import express from "express";
import dotenv from 'dotenv';
const router = express.Router();
// import { config } from '../config/index.js';

dotenv.config();


router.get("/contributions/:username", async (req, res) => {
  const { username } = req.params;
  // console.log(apikey);
  
  const query = {
    query: `
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
    `
  };

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Authorization": `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query),
    });

    

    const data = await response.json();
    console.log(data.data.user.contributionsCollection.contributionCalendar);
    
    res.json(data.data.user.contributionsCollection.contributionCalendar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;