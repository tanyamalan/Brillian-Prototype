import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BlogBuilder from './components/BlogBuilder/BlogBuilder';
import { AppProvider } from './theme/Provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BlogBuilder />
    </AppProvider>
  </StrictMode>
);
