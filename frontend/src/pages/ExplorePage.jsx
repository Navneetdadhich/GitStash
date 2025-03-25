import React, { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import Repos from '../components/Repos'
import Spinner from '../components/Spinner'
import Search from "../components/Search";
import { useGithub } from '../context/GithubContext';

const ExplorePage = () => {
 
  const { repos } = useGithub();
 
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
    </>
    
  );
};

export default ExplorePage;
