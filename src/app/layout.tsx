import type { Metadata } from 'next';
import { Inter, Nunito, Comic_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800']
});
const comic = Comic_Neue({ 
  subsets: ['latin'],
  variable: '--font-comic',
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: 'DoraChat - Doraemon Themed Chat App',
  description: 'A magical chatting experience with Doraemon and friends! Chat with your favorite characters and use amazing gadgets.',
  keywords: 'doraemon, chat, messaging, anime, characters, gadgets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${comic.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --doraemon-blue: #0066CC;
              --doraemon-yellow: #FFD700;
              --doraemon-red: #FF6B6B;
              --doraemon-white: #FFFFFF;
              --doraemon-light-blue: #87CEEB;
              --doraemon-pink: #FFB6C1;
              --doraemon-orange: #FF6B35;
              --doraemon-purple: #9370DB;
              --doraemon-green: #32CD32;
              --doraemon-gray: #708090;
            }
            
            .font-fredoka { font-family: 'Fredoka One', cursive; }
            
            .doraemon-text-shadow {
              text-shadow: 2px 2px 4px rgba(0, 102, 204, 0.3);
            }
            
            .doraemon-glow {
              box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }
            
            .doraemon-bounce {
              animation: bounce 1s infinite;
            }
            
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
            
            .doraemon-fade-in {
              animation: fadeIn 0.5s ease-in-out;
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .doraemon-slide-in {
              animation: slideInRight 0.3s ease-out;
            }
            
            @keyframes slideInRight {
              from { opacity: 0; transform: translateX(30px); }
              to { opacity: 1; transform: translateX(0); }
            }
            
            body {
              background: linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #FFFFFF 100%);
              min-height: 100vh;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} font-nunito`}>
        {children}
      </body>
    </html>
  );
}