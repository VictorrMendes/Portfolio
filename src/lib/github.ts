export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubStats = {
  totalContributions: number;
  publicRepos: number;
  followers: number;
  following: number;
  weeks: ContributionDay[][];
};

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      repositories(privacy: PUBLIC, isFork: false) {
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0 || max === 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

type RawWeek = { contributionDays: { contributionCount: number; date: string }[] };

export async function getGithubStats(login: string): Promise<GithubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const user = json?.data?.user;
    if (!user) return null;

    const rawWeeks: RawWeek[] = user.contributionsCollection.contributionCalendar.weeks;

    const maxCount = Math.max(
      0,
      ...rawWeeks.flatMap((week) => week.contributionDays.map((day) => day.contributionCount))
    );

    const weeks: ContributionDay[][] = rawWeeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelFor(day.contributionCount, maxCount),
      }))
    );

    return {
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
      publicRepos: user.repositories.totalCount,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      weeks,
    };
  } catch {
    return null;
  }
}
