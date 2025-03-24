import React from 'react'
import Repo from './Repo'

const Repos = ({repos, alwaysFullWidth=false}) => {

	// e.prevenyDefault();

	console.log(repos);
	

	const className = alwaysFullWidth ? 'w-full' : ' w-full';

  return (
    <div className={`${className} bg-glass rounded-lg px-8 py-6 bg-gray-500/20 border-gray-400 shadow-xl`}>
			<ol className='relative border-s border-gray-200 flex flex-col gap-5'>

		{

			repos.map(repo => (
				<Repo key = {repo.id} repo={repo}/>
			))
		}
			{repos.length === 0 && <p className='flex items-center justify-center h-32'>No repos found</p>}
			</ol>
		</div>
  )
}

export default Repos