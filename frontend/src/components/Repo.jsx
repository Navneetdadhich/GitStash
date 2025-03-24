import React, { useState, useEffect } from "react";
import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { formatMemberSince } from "../utils/functions";
import { PROGRAMMING_LANGUAGES } from "../utils/constants";
import toast from "react-hot-toast";

const Repo = ({ repo }) => {
  // console.log(repo);
  // const tops = [];
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (repo?.topics) {
      setTopics(repo.topics);
    }
  }, [repo]);

//   console.log(topics);

  const created = formatMemberSince(repo?.created_at);

  const handleCloneClick = async () => {
    try {
      await navigator.clipboard.writeText(repo.clone_url);
      toast.success("Repo cloned successfully");
    } catch (error) {
      toast.error("failed to clone repo");
    }
  };

  return (
    <li className="mb-10 ms-7">
      <span
        className="absolute flex items-center justify-center w-6 h-6 bg-blue-100
			rounded-full -start-3 ring-8 ring-white"
      >
        <FaCodeBranch className="text-sm text-blue-800" />
      </span>
      <div className="flex gap-2 items-center flex-wrap">
        <a
          href={repo?.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-lg font-semibold text-gray-700"
        >
          {repo?.name}
        </a>
        <span
          className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5
					py-0.5 rounded-full flex items-center gap-1"
        >
          <FaRegStar /> {repo?.stargazers_count}
        </span>
        {/* <span
					className='bg-purple-100 text-purple-800 text-xs font-medium
					 px-2.5 py-0.5 rounded-full flex items-center gap-1'
				>
					<FaCodeFork /> {repo?.forks_count}
				</span> */}
        <span
          onClick={handleCloneClick}
          className="cursor-pointer bg-green-100 text-green-800 text-xs
					font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"
        >
          <FaCopy /> Clone
        </span>
      </div>

      <time
        className="block my-1 text-xs font-normal leading-none
			 text-gray-400"
      >
        {created}
      </time>
      <p className=" text-base font-normal text-gray-500">
        {repo?.description
          ? repo.description.slice(0, 100)
          : "No Description Provided"}
      </p>

      <div className="flex gap-2 flex-wrap text-gray-500">
        <p className="font-semibold">Technology : </p>
        {topics.length > 0 ? (
          topics.map((topic, index) => <p key={index}>{topic}</p>)
        ) : (
          <p>Null</p>
        )}
      </div>
    </li>
  );
};

export default Repo;
