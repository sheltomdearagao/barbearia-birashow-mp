
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from '@/components/ui/sonner';
import InstallPrompt from '@/components/InstallPrompt';

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
    <InstallPrompt />
    <Toaster />
  </React.StrictMode>
);
