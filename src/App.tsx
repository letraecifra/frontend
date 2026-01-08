import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '~/App.css';
import { Toaster } from '~/components/ui/sonner';
import { LanguageProvider } from '~/contexts/LanguageContext';
import { ArtistList, Home, Login, NotFound, Register, SongDetail } from '~/pages';

const queryClient = new QueryClient();

export function App(): ReactNode {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/song/:id" element={<SongDetail />} />
              <Route path="/artists" element={<ArtistList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
