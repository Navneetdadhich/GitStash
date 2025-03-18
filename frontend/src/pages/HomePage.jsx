
import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useState } from 'react';
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';
import GitHubHeatmap from '../components/GithubHeatmap';

const HomePage = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");
  const [contributions, setContributions] = useState({ total: 0, monthly: 0 });
  const handleContributionsUpdate = (contributionsData) => {
    setContributions(contributionsData);
  }; 


  const getUsers = useCallback(async(username="NavneetDadhich") => {

//     const apiKey = import.meta.env.VITE_GITHUB_API_KEY;
// console.log("GitHub API Key:", apiKey); // Debugging step
    setLoading(true);
  try {
    const res = await fetch(`http://localhost:5000/api/users/profile/${username}`)
    const {repos, userProfile} = await res.json();
    setRepos(repos);
    setUserProfile(userProfile);
    
    console.log("userProfile", userProfile);
    // console.log("repo", repos);

    return {userProfile, repos};

  } catch (error) {
    toast.error(error.message)
  } finally {
    setLoading(false);
  }
  }, []);


  useEffect(() => {
    getUsers();
  }, [getUsers])


  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const {userProfile, repos} = await getUsers(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType('recent')
  };

   const onSort = (sortType) =>{
    if(sortType === "recent"){
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    } else if(sortType === "stars"){
      repos.sort((a,b) => new Date(b.stargazers_count) - new Date(a.stargazers_count));
    }else if(sortType === "forks"){
      repos.sort((a,b) => new Date(b.forks_count) - new Date(a.forks_count));
    }
    setSortType(sortType);
    setRepos([...repos])
   }

   
  return (
    <div className=' flex flex-col items-center w-full px-4'>

<div className='w-full max-w-3xl mt-5'> 
      <Search onSearch={onSearch}/>
      {/* {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>} */}

      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
          {userProfile && !loading && <ProfileInfo userProfile={userProfile}
          contributions={contributions}
          />}

       {/* {
          !loading && 
         <Repos repos={repos}/>
       }  */}
          {loading && <Spinner/>}
      </div>
      {userProfile &&  <GitHubHeatmap username={userProfile.login}
      onContributionsUpdate={handleContributionsUpdate}
      />}

      </div>
    </div>
  )
}

export default HomePage;