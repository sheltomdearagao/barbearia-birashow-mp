import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [canInstallDirectly, setCanInstallDirectly] = useState(false);

  useEffect(() => {
    // Detecção de plataforma apenas para instruções de instalação
    const userAgent = navigator.userAgent.toLowerCase();
    const iOS = /ipad|iphone|ipod/.test(userAgent) && !(window as any).MSStream;
    const android = /android/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isChrome = /chrome/.test(userAgent) && !/edg/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isSamsung = /samsungbrowser/.test(userAgent);
    const isEdge = /edg/.test(userAgent);
    setIsIOS(iOS);
    setIsAndroid(android);
    // Verificar se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true ||
                         document.referrer.includes('android-app://') ||
                         window.matchMedia('(display-mode: fullscreen)').matches;
    setIsInstalled(isStandalone);
    // Handler para beforeinstallprompt (Chrome Android e outros)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const beforeInstallEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(beforeInstallEvent);
      setCanInstallDirectly(true);
      if (!isStandalone && android && (isChrome || isSamsung)) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 2000);
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    // Para iOS Safari - mostrar instruções personalizadas
    if (iOS && isSafari && !isStandalone) {
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 4000);
    }
    // Para Android Chrome/Samsung/Firefox - aguardar evento beforeinstallprompt
    if (android && (isChrome || isSamsung || isFirefox) && !isStandalone) {
      const fallbackTimer = setTimeout(() => {
        if (!canInstallDirectly && !isStandalone) {
          setShowInstallPrompt(true);
        }
      }, 8000);
      const cleanup = () => clearTimeout(fallbackTimer);
      window.addEventListener('beforeinstallprompt', cleanup);
      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('beforeinstallprompt', cleanup);
      };
    }
    // Detectar quando app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);
    // Verificar mudanças no display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };
    mediaQuery.addListener(handleDisplayModeChange);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeListener(handleDisplayModeChange);
    };
  }, []);

  const installApp = async () => {
    if (isIOS) {
      setShowInstallPrompt(false);
      return;
    }
    if (deferredPrompt && canInstallDirectly) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          setShowInstallPrompt(false);
        }
        setDeferredPrompt(null);
        setCanInstallDirectly(false);
      } catch (error) {
        setShowInstallPrompt(false);
      }
    } else {
      setShowInstallPrompt(false);
    }
  };

  const hideInstallPrompt = () => {
    setShowInstallPrompt(false);
    const hideUntil = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('installPromptHidden', hideUntil.toString());
  };

  useEffect(() => {
    const hiddenUntil = localStorage.getItem('installPromptHidden');
    if (hiddenUntil) {
      const shouldStayHidden = Date.now() < parseInt(hiddenUntil);
      if (shouldStayHidden && showInstallPrompt) {
        setShowInstallPrompt(false);
      } else if (!shouldStayHidden) {
        localStorage.removeItem('installPromptHidden');
      }
    }
  }, [showInstallPrompt]);

  const showInstallPromptManually = () => {
    if (isInstalled) return false;
    localStorage.removeItem('installPromptHidden');
    setShowInstallPrompt(true);
    return true;
  };

  return {
    canInstall: canInstallDirectly || (isIOS && !isInstalled) || (isAndroid && !isInstalled),
    showInstallPrompt: showInstallPrompt && !isInstalled,
    isInstalled,
    isIOS,
    isAndroid,
    canInstallDirectly,
    installApp,
    hideInstallPrompt,
    showInstallPromptManually
  };
};
