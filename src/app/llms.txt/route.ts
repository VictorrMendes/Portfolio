import { SITE } from "@/content/site";
import { projects } from "@/content/projects";
import { timeline } from "@/content/timeline";
import { skills } from "@/content/skills";

export const revalidate = 3600;

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.jobTitle}. ${SITE.tagline}`);
  lines.push("");
  lines.push(`Portfólio: ${SITE.url}`);
  lines.push(`GitHub: ${SITE.github}`);
  lines.push(`LinkedIn: ${SITE.linkedin}`);
  lines.push("");

  lines.push("## Stack");
  lines.push(skills.map((s) => s.s).join(", "));
  lines.push("");

  lines.push("## Experiência");
  timeline
    .filter((item) => item.category === "Experiência")
    .forEach((item) => {
      const header = `- ${item.subtitle} — ${item.title} (${item.year})`;
      lines.push(item.description ? `${header}: ${item.description}` : header);
    });
  lines.push("");

  lines.push("## Projetos");
  projects.forEach((project) => {
    lines.push(`- ${project.title} — ${project.shortDesc} [${project.tech.join(", ")}] (${project.link})`);
  });
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
