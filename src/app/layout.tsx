import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

// Configuração das suas fontes customizadas
const pressStart = Press_Start_2P({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-press-start"
});

const vt323 = VT323({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-vt323"
});

// AQUI ESTÁ O SEO AVANÇADO (Substituindo o antigo)
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
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Portfólio Victor Mendes',
      },
    ],
  },
};

// O SEU LAYOUT ORIGINAL INTACTO
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${pressStart.variable} ${vt323.variable} antialiased min-h-screen relative`}>
        {/* Efeito de Scanline global */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-15"></div>
        {children}
      </body>
    </html>
  );
}