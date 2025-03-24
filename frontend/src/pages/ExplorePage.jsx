import React, { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import Repos from '../components/Repos'
import Spinner from '../components/Spinner'
import Search from "../components/Search";
import { useGithub } from '../context/GithubContext';

const ExplorePage = () => {
  // https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=10

  // const {userProfile, rrepos} = getUserProfileAndRepos();
  // const [loading, setLoading] = useState(false);
  // const [repos, setRepos] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState("");

  // const exploreRepos = async (language) => {
  //   setLoading(true);
  //   setRepos([]);

  //   try {
  //     const res = await fetch("/api/explore/repos/"+language);
  //   const {repos} = await res.json();
  //     setRepos(repos);
  //     setSelectedLanguage(language);
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const { repos, userProfile } = useGithub();
  
console.log(repos);




  return (

    <>
    <div className="explore-container p-5 w-full sm:mt-6 sm:border border-black rounded-md">
   
    {repos.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-gray-600 text-4xl font-semibold sm:py-8">Repositories</h1>
          <Repos repos={repos} />
        </div>
      )}
    </div>
    {/* <div className=" px-4 mt-5">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4 bg-gray-600/10 text-gray-600 shadow-lg">
        <h1 className="text-xl font-bold text-center">
          {" "}
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
        <img
						src='/javascript.svg'
						alt='JavaScript ogo'
						className='h-11 sm:h-20 cursor-pointer'
						onClick={() => exploreRepos("javascript")}
           
					/>
					<img
						src='/typescript.svg'
						alt='TypeScript logo'
						className='h-11 sm:h-20 cursor-pointer'
						onClick={() => exploreRepos("typescript")}
					/>
					<img
						src='/c++.svg'
						alt='C++ logo'
						className='h-11 sm:h-20 cursor-pointer'
						onClick={() => exploreRepos("c++")}
					/>
					<img
						src='/python.svg'
						alt='Python logo'
						className='h-11 sm:h-20 cursor-pointer'
						onClick={() => exploreRepos("python")}
					/>
					<img
						src='/java.svg'
						alt='Java logo'
						className='h-11 sm:h-20 cursor-pointer'
						onClick={() => exploreRepos("java")}
					/>
        </div>

        {repos.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full ">
              {selectedLanguage.toUpperCase()}{" "}
            </span>
            Repositories
          </h2>
        )}

        {!loading && repos.length > 0 && (
          <Repos repos={repos} alwaysFullWidth />
        )}
        {loading && <Spinner />}
      </div>
    </div> */}
    </>
    
  );
};

export default ExplorePage;
