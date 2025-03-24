import React, { useState } from "react";
import { formatMemberSince } from "../utils/functions";
import { IoLocationOutline } from "react-icons/io5";
import { DiGithubBadge } from "react-icons/di";
import {
  RiGitRepositoryFill,
  RiUserFollowFill,
  RiUserFollowLine,
} from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { TfiThought } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";
import LikeProfile from "./LikeProfile";
import GitHubHeatmap from "./GithubHeatmap";


const ProfileInfo = ({ userProfile, contributions }) => {
  // const [contributionss, setContributions] = useState({ total: 0, monthly: 0 });

  // const handleContributionsUpdate = (contributionsData) => {
  //   setContributions(contributionsData);
  // };

  // console.log(userProfile);

  const membersince = formatMemberSince(userProfile?.created_at);

  return (
    <div className="max-w-4xl flex sm:flex-row flex-col items-center gap-2 lg:sticky md:top-10 mb-2">
      <div className="w-[250px] sm:w-[350px] bg-glass rounded-lg p-4 bg-gray-500/10 border-gray-400 shadow-lg">
        <div className="flex gap-4 items-center ">
          <a href={userProfile?.html_url} target="_blank" rel="noreferrer">
            <img
              src={userProfile?.avatar_url}
              className="rounded-md w-24 h-24 mb-2"
              alt=""
              crossorigin="anonymous"
            />
          </a>

          {/* View on Github */}
          <div className="flex items-start flex-col gap-2">
            {userProfile?.name && (
              <div className="">
                <p className="text-gray-500 font-semibold text-sm">Full name</p>
                <p className="text-gray-700 font-bold">{userProfile?.name}</p>
              </div>
            )}

            <div className=" text-gray-500">
              <p className="font-semibold text-sm ">Member since</p>
              <p className="text-gray-700 font-bold">{membersince}</p>
            </div>
          </div>
        </div>

        {/* User Bio */}
        {userProfile?.bio ? (
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            {/* <TfiThought /> */}
            <p className="text-sm">{userProfile?.bio.substring(0, 150)}...</p>
          </div>
        ) : null}

        {/* Location */}
        {userProfile?.location ? (
          <div className="flex font-bold items-center gap-2 text-gray-600">
            <IoLocationOutline />
            {userProfile?.location}
          </div>
        ) : null}

        {/* Twitter Username */}
        {userProfile?.twitter_username ? (
          <a
            href={`https://twitter.com/${userProfile.twitter_username}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-sky-500 font-bold text-gray-700"
          >
            <FaXTwitter />
            {userProfile?.twitter_username}
          </a>
        ) : null}

        {/* Member Since Date */}

        {/* Email Address */}
        {userProfile?.email && (
          <div className="my-2">
            <p className="text-gray-500 font-semibold text-sm">Email address</p>
            <p className="font-bold text-gray-700">{userProfile.email}</p>
          </div>
        )}

        {/* Full Name */}

        {/* Username */}
        <div className="my-2">
          <p className="text-gray-500 font-semibold text-sm">Username</p>
          <p className="font-bold text-gray-700">{userProfile?.login}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 m-2 justify-evenly">

      <div className="flex flex-wrap gap-3 p-auto">
        {/* Followers Count */}
        <div className="flex flex-col items-center text-gray-600 justify-center gap-2 bg-glass rounded-lg p-2 flex-1 bg-gray-500/10 border-gray-400 shadow-lg">
          {/* <RiUserFollowFill className='w-5 h-5 text-blue-800' /> */}

          <h1 className="text-5xl font-bold">{userProfile?.followers}</h1>
          <p className="text-md">Followers</p>
        </div>

        {/* Following count */}
        <div className="flex flex-col items-center text-gray-600 justify-center gap-2 bg-glass rounded-lg p-2 flex-1 bg-gray-500/10 border-gray-400 shadow-lg">
          {/* <RiUserFollowFill className='w-5 h-5 text-blue-800' /> */}

          <h1 className="text-5xl font-bold">{userProfile?.following}</h1>
          <p className="text-md">Following</p>
        </div>

        {/* Number of public repos */}
        <div className="flex flex-col text-center text-gray-600 justify-center gap-2 bg-glass rounded-lg p-2 flex-1 bg-gray-500/10 border-gray-400 shadow-lg">
          {/* <RiGitRepositoryFill className='w-5 h-5 text-blue-800' /> */}
          <h1 className="text-5xl font-bold">{userProfile?.public_repos}</h1>
          <p className="text-md flex ">Public repos</p>
        </div>

        {/* Number of public gists */}
        <div className="flex flex-col items-center justify-center text-center text-gray-600 gap-1 bg-glass rounded-lg p-2 flex-1 min-w-24 bg-gray-500/10 border-gray-400 shadow-lg">
          <DiGithubBadge className='w-20 h-20 text-gray-600' />
          <p className="text-md font-bold">GitStash</p>
        </div>
      </div>

      <div className="flex gap-2 p-auto sm:h-[150px]"> 
        <div className="flex flex-col items-center text-gray-600 justify-center gap-2 bg-glass rounded-lg p-2 flex-1  bg-gray-500/10 border-gray-400 shadow-lg">
          <h1 className="text-5xl font-bold">{contributions.monthly}</h1>
          <p className="text-md">Monthly Contributions</p>
        </div>
        <div className="flex flex-col items-center text-gray-600 justify-center gap-2 bg-glass rounded-lg p-2 flex-1 bg-gray-500/10 border-gray-400 shadow-lg">
          <h1 className="text-5xl font-bold">{contributions.total}</h1>
          <p className="text-md">Total Contributions</p>
        </div>
      </div>

      </div>

      {/* <GitHubHeatmap username={userProfile}/> */}
    </div>
  );
};

export default ProfileInfo;
