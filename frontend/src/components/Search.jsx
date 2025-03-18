import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = ({onSearch}) => {

	const [username, setUsername] = useState("");

	return (
		<>
		

		<form className='left-0 max-w-3xl p-1'
		onSubmit={(e) => onSearch(e, username)}
		>
			<label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only'>
				Search
			</label>
			<div className='relative '>
				<div className='absolute inset-y-0 start-0 flex items-center z-10 ps-3 pointer-events-none'>
					<IoSearch className='w-5 h-5 text-gray-400 active:text-black' />
				</div>
				<input
					type='search'
					id='default-search'
					className='block w-full p-4 ps-10 text-sm rounded-lg bg-glass text-gray-500 bg-transparent focus:bg-transparent border border-gray-400'
					placeholder='i.e. johndoe'
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					/>
				<button
					type='submit'
					className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2  bg-gradient-to-br from-gray-900 to-gray-600 hover:scale-95 active:scale-90 transition-all duration-300'
					>
					Search
				</button>
			</div>
		</form>
					
					</>
	);
};

export default Search; 