export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

export async function fetchGitHubProjects(username: string = 'Chiheb-Ellefi'): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos: GitHubRepo[] = await response.json();
    const pinned = ['Gateway', 'Authentication-Service', 'Service-Registry', 'Config-Server', 'Teachers_Distribution_System', 'Url_Shortener_Spring', 'Maze_client', 'maze_server', 'Rate_Limiter', 'Producer-Consumer-System', 'Unique_Id_Gen', 'URL_Shortener', 'Unique_ID_Generator', 'Authentication-Systems-NodeJs'];
    return repos.filter(repo => pinned.includes(repo.name));
  } catch (error) {
    console.error(error);
    return [];
  }
}
