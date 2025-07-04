
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
    // Detecção mais precisa de dispositivos
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
    
    console.log('🔍 Detecção de dispositivo:', {
      userAgent: navigator.userAgent,
      iOS,
      android,
      isSafari,
      isChrome,
      isFirefox,
      isSamsung,
      isEdge
    });

    // Verificar se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true ||
                         document.referrer.includes('android-app://') ||
                         window.matchMedia('(display-mode: fullscreen)').matches;
    
    setIsInstalled(isStandalone);

    // Registrar service worker com melhor tratamento de erros
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('✅ SW registrado:', registration);
          
          // Verificar atualizações
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nova versão disponível
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });

          // Verificar updates automaticamente
          setInterval(() => {
            registration.update();
          }, 60000); // Verificar a cada 1 minuto
        })
        .catch((error) => {
          console.error('❌ Erro no registro SW:', error);
        });
    }

    // Handler para beforeinstallprompt (Chrome Android e outros)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('📱 beforeinstallprompt disparado');
      e.preventDefault();
      const beforeInstallEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(beforeInstallEvent);
      setCanInstallDirectly(true);
      
      // Para Android/Chrome - aguardar um pouco antes de mostrar o prompt
      if (!isStandalone && android && (isChrome || isSamsung)) {
        console.log('🤖 Android detectado, preparando prompt de instalação');
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 2000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Para iOS Safari - mostrar instruções personalizadas
    if (iOS && isSafari && !isStandalone) {
      console.log('🍎 Detectado iOS Safari, mostrando instruções');
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 4000);
    }

    // Para Android Chrome/Samsung/Firefox - aguardar evento beforeinstallprompt
    if (android && (isChrome || isSamsung || isFirefox) && !isStandalone) {
      console.log('🤖 Detectado Android browser compatível, aguardando beforeinstallprompt');
      
      // Se o evento não disparar em 8 segundos, mostrar instruções manuais
      const fallbackTimer = setTimeout(() => {
        if (!canInstallDirectly && !isStandalone) {
          console.log('⏰ Timeout: beforeinstallprompt não disparou, mostrando instruções manuais');
          setShowInstallPrompt(true);
        }
      }, 8000);
      
      // Limpar timer se o evento disparar
      const cleanup = () => clearTimeout(fallbackTimer);
      window.addEventListener('beforeinstallprompt', cleanup);
      
      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('beforeinstallprompt', cleanup);
      };
    }

    // Detectar quando app é instalado
    const handleAppInstalled = () => {
      console.log('✅ PWA foi instalado');
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
    console.log('🚀 Tentando instalar app...');
    
    if (isIOS) {
      // Para iOS, apenas fechar o prompt após mostrar instruções
      console.log('🍎 iOS: Fechando prompt de instruções');
      setShowInstallPrompt(false);
      return;
    }

    if (deferredPrompt && canInstallDirectly) {
      try {
        console.log('📱 Mostrando prompt nativo de instalação');
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log('👤 Escolha do usuário:', outcome);
        
        if (outcome === 'accepted') {
          setIsInstalled(true);
          setShowInstallPrompt(false);
        }
        
        setDeferredPrompt(null);
        setCanInstallDirectly(false);
      } catch (error) {
        console.error('❌ Erro ao mostrar prompt:', error);
        setShowInstallPrompt(false);
      }
    } else {
      // Fallback: fechar prompt se não conseguir instalar diretamente
      console.log('📱 Não foi possível instalar diretamente, fechando prompt');
      setShowInstallPrompt(false);
    }
  };

  const hideInstallPrompt = () => {
    console.log('❌ Usuário ocultou prompt');
    setShowInstallPrompt(false);
    
    // Armazenar timestamp para não mostrar novamente por um tempo
    const hideUntil = Date.now() + (24 * 60 * 60 * 1000); // 24 horas
    localStorage.setItem('installPromptHidden', hideUntil.toString());
  };

  // Verificar se deve mostrar o prompt novamente
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

  // Método para mostrar prompt manualmente (para o botão no header)
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
