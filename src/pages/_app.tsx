// /src/pages/_app.tsx

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeProvider from '@/context/ThemeContext';
import { MainLayout } from '@/layouts/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;

