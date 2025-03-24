import { createContext, useContext, useState, useEffect } from 'react';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const updateGithubData = (newRepos, newProfile) => {

    // if(!newRepos|| !newProfile){
    //   return;
    // }
    setRepos(newRepos);
    setUserProfile(newProfile);
    localStorage.setItem('repos', JSON.stringify(newRepos)); 
  };

  useEffect(() => {
    const savedRepos = localStorage.getItem('repos');
    if (savedRepos) {
      // setRepos(JSON.parse(savedRepos));
    }
  }, []);

  return (
    <GithubContext.Provider value={{ repos, userProfile, updateGithubData }}>
      {children}
    </GithubContext.Provider>
  );
};

export const useGithub = () => useContext(GithubContext);