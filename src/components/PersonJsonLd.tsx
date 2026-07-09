import { SITE } from "@/content/site";

const PersonJsonLd = () => {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Victor Mendes de Souza",
    jobTitle: SITE.jobTitle,
    url: SITE.url,
    sameAs: [SITE.github, SITE.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};

export default PersonJsonLd;
