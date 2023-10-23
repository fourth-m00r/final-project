import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import { Theme } from './components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'OpenTribe',
  description: 'Home page',
};

// i need to put a logic probably with a ternary operator to display
// different layout for users logged in than for those not logged in

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="retro">
      <body>
        <Theme>
          <Header />
          {children}
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
