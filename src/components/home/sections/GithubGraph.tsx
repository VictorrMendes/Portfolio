import { SITE } from "@/content/site";
import type { ContributionDay } from "@/lib/github";

type GithubGraphProps = {
  weeks: ContributionDay[][];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getColor = (level: number) => {
  switch (level) {
    case 0: return "bg-[#161b22]";
    case 1: return "bg-[#0e4429]";
    case 2: return "bg-[#006d32]";
    case 3: return "bg-[#26a641]";
    case 4: return "bg-[#39d353]";
    default: return "bg-[#161b22]";
  }
};

const GithubGraph = ({ weeks }: GithubGraphProps) => (
  <div className="pixel-corners w-max border border-purple-900/50 bg-[#0d1117] p-3 xl:ml-auto">
    <div className="flex w-full justify-between pl-6 font-sans text-[8px] text-gray-400">
      {MONTHS.map((month) => (
        <span key={month}>{month}</span>
      ))}
    </div>

    <div className="mt-1.5 flex gap-0.75">
      <div className="flex h-full flex-col justify-between py-0.75 font-sans text-[7px] text-gray-400">
        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>
      </div>

      <div className="flex gap-0.75">
        {weeks.length > 0 ? (
          weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-0.75">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} contribui${day.count === 1 ? "ção" : "ções"} em ${day.date}`}
                  className={`h-2 w-2 rounded-[1px] ${getColor(day.level)} cursor-pointer transition-all hover:ring-1 hover:ring-white/80 hover:shadow-[0_0_8px_#39d353]`}
                ></div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex gap-0.75">
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-0.75">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="h-2 w-2 rounded-[1px] bg-[#161b22]"></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    <div className="mt-2 flex items-center justify-between pl-6 font-sans text-[8px] text-gray-400">
      <a href={SITE.github} target="_blank" rel="noreferrer" className="cursor-pointer transition-colors hover:text-blue-400">Contributions Log</a>
      <div className="flex items-center gap-1">
        <span className="mr-0.5">Less</span>
        <div className="h-2 w-2 rounded-[1px] bg-[#161b22]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#0e4429]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#006d32]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#26a641]"></div>
        <div className="h-2 w-2 rounded-[1px] bg-[#39d353]"></div>
        <span className="ml-0.5">More</span>
      </div>
    </div>
  </div>
);

export default GithubGraph;
