// src/api/API.tsx
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 1000000000) + 1;

    console.log('VITE_GITHUB_TOKEN:', import.meta.env.VITE_GITHUB_TOKEN); // Add this to debug

    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    console.log('Response status:', response.status); // Add this to debug

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Invalid API response: ${data.message}`); // Include the error message from GitHub
    }

    return data;
  } catch (err) {
    console.log('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    console.log('User fetch response status:', response.status); // Add this to debug

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Invalid API response: ${data.message}`);
    }

    return data;
  } catch (err) {
    console.log('An error occurred:', err);
    return [];
  }
};

export { searchGithub, searchGithubUser };