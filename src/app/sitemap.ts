import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.vmstorm.com.br/', 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}