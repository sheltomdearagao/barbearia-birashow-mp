import { useState } from 'react';

export const useAppUpdater = () => {
  // Hook vazio, pois o SW foi removido
  return {
    updateAvailable: false,
    isUpdating: false,
    error: null,
    applyUpdate: () => {},
    dismissUpdate: () => {},
    checkForUpdates: () => {},
    clearError: () => {},
  };
};
