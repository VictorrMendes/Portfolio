import HomePage from "@/components/home/HomePage";
import { getGithubStats } from "@/lib/github";
import { SITE } from "@/content/site";

export default async function Home() {
  const githubStats = await getGithubStats(SITE.githubUsername);

  return <HomePage githubStats={githubStats} />;
}
