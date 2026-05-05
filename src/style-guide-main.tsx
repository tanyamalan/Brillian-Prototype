import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import StyleGuide from './components/StyleGuide/StyleGuide';
import { AppProvider } from './theme/Provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <StyleGuide />
    </AppProvider>
  </StrictMode>
);
