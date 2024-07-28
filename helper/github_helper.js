const fs = require('fs-extra');
const path = require('path');
const { Octokit} =require('@octokit/rest');
const dotenv = require("dotenv");
dotenv.config();

    
  let REPO_FINAL_NAME;

  // Function to generate a unique repository name
  const generateUniqueRepoName = (baseName) => {
    const timestamp = new Date().toISOString().replace(/[:.-]/g, ''); // Remove colons, periods, and dashes
    return `${baseName}_${timestamp}`;
  };

  const createRepo = async (octokit,repoName) => {
    console.log("creating repo", repoName);
    console.log("token is", process.env.GITHUB_TOKEN);
    // console.log(octokit)
    // const {data}= await octokit.request('POST /orgs/{org}/repos', {
    //     org: 'ORG',
    //     name:repoName,
    //     'private': false,
        
    // })
  
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: false,
    });
  
    return data;
  };

  const MakeRepository = async () => {
    try {
         const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
      });
      const REPO_NAME = generateUniqueRepoName('BACKENDBUDDY');
      console.log("i am inside helper");
      const repoData = await createRepo(octokit,REPO_NAME);
      console.log('Repository created:', repoData);
      return { createdRepoName: REPO_NAME, createdGithubUrl: repoData.html_url };
    } catch (error) {
      console.error('Error:', error);
    }
  };

  module.exports = { MakeRepository, REPO_FINAL_NAME };

