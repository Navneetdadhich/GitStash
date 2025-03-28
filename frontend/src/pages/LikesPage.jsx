import React, { useState, useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import { formatDate } from '../utils/functions';

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
		const getLikes = async () => {
			try {
				const res = await fetch("/api/users/likes", { credentials: "include" });
				const data = await res.json();
				if (data.error) throw new Error(data.error);

				setLikes(data.likedBy);
			} catch (error) {
				toast.error(error.message);
			}
		};
		getLikes();
	}, []);
	console.log("likes:", likes);

  return (
	<>
    <div className='relative overflow-x-auto shadow-lg rounded-lg border border-gray-400 px-4 mt-10 p-5 bg-gray-600/10'>
      <table className='w-full text-sm text-left rt1:text-right bg-glass overflow-hidden border border-gray-500 text-gray-600'>
        <thead>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>No.</div>
            </th>
            <th scope='col' className='px-6 py-3'>
              <div className='flex items-center'>Username</div>
            </th>
            <th scope='col' className='px-6 py-3'>
              <div className='flex items-center'>Date</div>
            </th>
            <th scope='col' className='px-6 py-3'>
              <div className='flex items-center'>Action</div>
            </th>
          </tr>
        </thead>

        <tbody className=''>
        {likes.map((user, idx) => (
			<tr className='bg-glass border-b rounded-lg text-gray-600' key={user.username}>
							<td className='w-4 p-4'>
								<div className='flex items-center'>
									<span>{idx + 1}</span>
								</div>
							</td>
							<th scope='row' className='flex items-center px-6 py-4 whitespace-nowrap '>
								<img className='w-10 h-10 rounded-full' src={user.avatarUrl} alt='User Avatar' />
								<div className='ps-3'>
									<div className='text-base font-semibold'>{user.username}</div>
								</div>
							</th>
							<td className='px-6 py-4'>{formatDate(user.likedDate)}</td>
							<td className='px-6 py-4'>
								<div className='flex items-center'>
									<FaHeart size={22} className='text-red-500 mx-2' />
									Liked your profile
								</div>
							</td>
						</tr>
					))}
        </tbody>

      </table>
    </div>
					</>
  )
}

export default LikesPage;