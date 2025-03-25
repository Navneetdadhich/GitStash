import toast from "react-hot-toast";
import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
// import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
// import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import GitHubHeatmap from "../components/GithubHeatmap";
import { useGithub } from "../context/GithubContext";
import html2canvas from "html2canvas-pro";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contributions, setContributions] = useState({ total: 0, monthly: 0 });
  const handleContributionsUpdate = (contributionsData) => {
    setContributions(contributionsData);
  };

  const { updateGithubData } = useGithub();

  const getUsers = useCallback(
    
    async (username="doejohn") => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/profile/${username}`);

        const { repos, userProfile } = await res.json();
        setRepos(repos);
        setUserProfile(userProfile);
        updateGithubData(repos, userProfile);
        // console.log("userProfile", userProfile);
        // console.log("repo", repos);

        return { userProfile, repos };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [updateGithubData]
  );

  useEffect(() => {
    getUsers();
  }, []);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, repos } = await getUsers(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
  };


  const generateImage = () => {
    const element = document.getElementById("stats");

    if (!element) {
      return;
    }
    html2canvas(element, {
      useCORS: true, 
      allowTaint: true, 
      scale: 2, 
    }).then((canvas) => {
      let image = canvas.toDataURL("image/jpeg");
      console.log("iamge", image);

      const link = document.createElement("a");
      link.download = "Gitstash.jpg";
      link.href = image;
      link.click();
    });
  };

  return (
    <>
       {  userProfile ? <div className="flex flex-col items-center px-4"> 
        <div className=" max-w-4xl mt-5">
          <Search onSearch={onSearch} />
         
            <div id="stats" className="flex flex-col p-2">
              <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
                {userProfile && !loading && (
                  <ProfileInfo
                    userProfile={userProfile}
                    contributions={contributions}
                  />
                )}

                {loading && <Spinner />}
              </div>
              <div className="">
                {userProfile && (
                  <GitHubHeatmap
                    username={userProfile.login}
                    onContributionsUpdate={handleContributionsUpdate}
                  />
                )}
              </div>
            </div>

            <div className="max-w-4xl flex items-center justify-center">

          <button
            onClick={generateImage}
            className=" p-2 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-black shadow-lg"
            >
            Click to Generate Stats
          </button>
              </div>
            </div>
        
      </div> 
    : <div className="flex flex-col items-center px-4 mt-5">
      <div className=" max-w-4xl mt-5">
      <Search onSearch={onSearch} />
      <h2 className="text-gray-800 mt-10 text-3xl mb-5">Search A Github UserName With Gitstash</h2>
      {loading && <Spinner />}
      </div>
    </div>
    }

    </>
  );
};

export default HomePage;
