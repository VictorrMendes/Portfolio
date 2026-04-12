import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Victor Mendes | Desenvolvedor Front-End & Automação',
  description: 'Portfólio de Victor Mendes de Souza. Desenvolvedor Front-End especializado em React, Next.js, TypeScript, Python e infraestrutura (Docker/n8n).',
  keywords: [
    'Victor Mendes', 
    'Victor Mendes de Souza', 
    'Desenvolvedor Front-End', 
    'React', 
    'Next.js', 
    'Portfólio Victor Mendes',
    'Desenvolvedor Juatuba',
    'Programador Front-End'
  ],
  authors: [{ name: 'Victor Mendes' }],
  creator: 'Victor Mendes',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.vmstorm.com.br/', 
    title: 'Victor Mendes | Desenvolvedor Front-End',
    description: 'Transformando lógica em experiências digitais. Código limpo, infraestrutura robusta e design imersivo.',
    siteName: 'Victor Mendes Portfolio',
    images: [
      {
        url: '/og-image.png', // DICA: Crie uma imagem de 1200x630px com sua logo/nome e salve na pasta public como og-image.png
        width: 1200,
        height: 630,
        alt: 'Portfólio Victor Mendes',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* ... o resto do seu layout (body, fontes, etc) */}
    </html>
  );
}