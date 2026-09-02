import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "framer-motion";
import { SITE } from "@/content/site";
import PersonJsonLd from "@/components/PersonJsonLd";
import "./globals.css";

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

export const metadata: Metadata = {
  title: 'Victor Mendes | Fullstack Developer & Infra Engineer',
  description: 'Portfólio de Victor Mendes de Souza. Fullstack Developer especializado em React, Next.js, TypeScript, Python, Django e infraestrutura (Docker/AWS/n8n).',
  keywords: [
    'Victor Mendes',
    'Victor Mendes de Souza',
    'Fullstack Developer',
    'React',
    'Next.js',
    'Portfólio Victor Mendes',
    'Desenvolvedor Juatuba',
    'Desenvolvedor Fullstack'
  ],
  authors: [{ name: 'Victor Mendes' }],
  creator: 'Victor Mendes',
  metadataBase: new URL(SITE.url),
  other: {
    'theme-color': '#09030f',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    title: 'Victor Mendes | Fullstack Developer & Infra Engineer',
    description: 'Transformando lógica em experiências digitais. Código limpo, infraestrutura robusta e design imersivo.',
    siteName: 'Victor Mendes Portfolio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" style={{ colorScheme: "dark" }}>
      <body className={`${pressStart.variable} ${vt323.variable} antialiased min-h-screen relative`}>
        <PersonJsonLd />

        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:neon-border focus:pixel-corners focus:bg-[#150a21] focus:px-4 focus:py-2 focus:font-pixel focus:text-xs focus:text-white"
        >
          Pular para o conteúdo
        </a>

        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-15"></div>

        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>

        <Analytics />
      </body>
    </html>
  );
}
