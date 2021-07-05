import axios from 'axios';

export const githubApi = axios.create({
  baseURL: process.env.GITHUB_API_URL,
});
