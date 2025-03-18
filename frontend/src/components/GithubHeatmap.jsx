import React, { useEffect, useState } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { fetchGitHubGraph } from "../lib/githubgraph";
import { Tooltip } from "react-tooltip";
// import "./GithubHeatmap.css"; // You'll need to create this
import '../index.css'

const GitHubHeatmap = ({ username, onContributionsUpdate }) => {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [monthlyContributions, setMonthlyContributions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchGitHubGraph(username);
        if (data && data.weeks) {
          // console.log(data.data.user.contributionsCollection.contributionCalendar);
          setTotalContributions(data.totalContributions);

          // Calculate this month's contributions
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();

          const thisMonthContributions = data.weeks.reduce((total, week) => {
            return total + week.contributionDays.reduce((weekTotal, day) => {
              const date = new Date(day.date);
              if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                return weekTotal + day.contributionCount;
              }
              return weekTotal;
            }, 0);
          }, 0);
          
          setMonthlyContributions(thisMonthContributions);

          if (onContributionsUpdate) {
            onContributionsUpdate({
              total: data.totalContributions,
              monthly: thisMonthContributions
            });
          }

          // Transform the data into the format expected by react-calendar-heatmap
          const contributionData = data.weeks.flatMap(week =>
            week.contributionDays.map(day => ({
              date: new Date(day.date).toISOString().split('T')[0], // Format date correctly
              count: day.contributionCount
            }))
          );
          setContributions(contributionData);
        } else {
          setError('No contribution data found');
        }
      } catch (err) {
        setError('Failed to fetch GitHub contributions');
      }
      setIsLoading(false);
    };

    if (username) {
      fetchContributions();
    }
  }, [username]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (contributions.length === 0) return <div>No contributions found</div>;

  // Calculate the start date (1 year ago from today)
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  return (
    <div className="w-full github-heatmap-container shadow-2xl border bg-glass bg-gray-400/10 border-gray-400 text-gray-700">
      <h2 className="">{username}'s GitHub Contributions</h2>
      <div className="overflow-x-auto overflow-y-hidden">

      <div className="custom-heatmap">

      <Heatmap 
        startDate={startDate}
        endDate={new Date()}
        values={contributions}
        className={"text-black"}
        classForValue={(value) => {
          if (!value) return "color-empty";
          const count = value.count;
          if (count === 0) return "color-empty";
          if (count <= 1) return "color-scale-1";
          if (count <= 5) return "color-scale-2";
          if (count <= 8) return "color-scale-3";
          return "color-scale-4";
        }}
        tooltipDataAttrs={value => {
          if (!value || !value.date) return null;
          return {
            'data-tooltip-id': 'github-tooltip',
            'data-tooltip-content': `${value.date}: ${value.count} contributions`
          };
        }}
        
        />
        </div>

      </div>

      <Tooltip id="github-tooltip"/>
    </div>
  );
};

export default GitHubHeatmap;