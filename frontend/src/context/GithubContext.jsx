import { createContext, useContext, useState, useEffect } from 'react';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const updateGithubData = (newRepos, newProfile) => {
    if (!newRepos || !newProfile) return;
  
    setRepos(newRepos);
    setUserProfile(newProfile);
  
    localStorage.setItem('repos', JSON.stringify(newRepos));
  };
  
  useEffect(() => {
    const savedRepos = localStorage.getItem('repos');
  
    if (savedRepos) {
      try {
        const parsedRepos = JSON.parse(savedRepos);
        if (Array.isArray(parsedRepos)) {
          setRepos(parsedRepos);
        }
      } catch (error) {
        console.error('Error parsing repos from localStorage:', error);
      }
    }
  }, []);
  

  return (
    <GithubContext.Provider value={{ repos, userProfile, updateGithubData }}>
      {children}
    </GithubContext.Provider>
  );
};

export const useGithub = () => useContext(GithubContext);