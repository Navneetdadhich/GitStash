export const explorePopularRepos = async (req,res) => {
    const {language} = req.params;
    const GITHUB_API_KEY =  "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";

    try {
        const response = await fetch(
            `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
              headers:{
                authorization : `token ${GITHUB_API_KEY}`,
              },
            }
          );
          const data = await response.json();
          res.status(200).json({repos: data.items})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}