
import { useState, useEffect, useCallback } from 'react';

interface UpdaterState {
  updateAvailable: boolean;
  isUpdating: boolean;
  error: string | null;
}

export const useAppUpdater = () => {
  const [state, setState] = useState<UpdaterState>({
    updateAvailable: false,
    isUpdating: false,
    error: null
  });

  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Função para verificar se há updates disponíveis
  const checkForUpdates = useCallback(async () => {
    if (!registration) return;

    try {
      console.log('🔄 Verificando atualizações...');
      await registration.update();
    } catch (error) {
      console.error('❌ Erro ao verificar atualizações:', error);
      setState(prev => ({ ...prev, error: 'Erro ao verificar atualizações' }));
    }
  }, [registration]);

  // Função para aplicar a atualização
  const applyUpdate = useCallback(async () => {
    if (!registration || !registration.waiting) return;

    setState(prev => ({ ...prev, isUpdating: true }));

    try {
      console.log('⏳ Aplicando atualização...');
      
      // Envia mensagem para o service worker para pular a espera
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });

      // Aguarda a ativação do novo service worker
      await new Promise<void>((resolve) => {
        const handleControllerChange = () => {
          navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
          resolve();
        };
        navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
      });

      console.log('✅ Atualização aplicada com sucesso!');
      
      // Recarrega a página após um pequeno delay
      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (error) {
      console.error('❌ Erro ao aplicar atualização:', error);
      setState(prev => ({ 
        ...prev, 
        isUpdating: false, 
        error: 'Erro ao aplicar atualização' 
      }));
    }
  }, [registration]);

  // Função para dispensar a notificação
  const dismissUpdate = useCallback(() => {
    setState(prev => ({ ...prev, updateAvailable: false }));
  }, []);

  // Função para limpar erros
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      console.warn('⚠️ Service Worker não suportado neste navegador');
      return;
    }

    // Registra o service worker se ainda não estiver registrado
    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          updateViaCache: 'none' // Força verificação de atualizações
        });
        
        console.log('✅ Service Worker registrado:', reg);
        setRegistration(reg);

        // Verifica imediatamente se há uma atualização disponível
        if (reg.waiting) {
          console.log('🔄 Atualização já disponível');
          setState(prev => ({ ...prev, updateAvailable: true }));
        }

      } catch (error) {
        console.error('❌ Erro ao registrar Service Worker:', error);
        setState(prev => ({ ...prev, error: 'Erro ao registrar Service Worker' }));
      }
    };

    // Se já existe um SW registrado, usa ele
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg) {
          setRegistration(reg);
          if (reg.waiting) {
            setState(prev => ({ ...prev, updateAvailable: true }));
          }
        }
      });
    } else {
      registerSW();
    }

    // Listener para mudanças no service worker
    const handleUpdateFound = () => {
      const reg = registration;
      if (!reg || !reg.installing) return;

      console.log('🔄 Nova versão sendo instalada...');
      
      reg.installing.addEventListener('statechange', () => {
        if (reg.installing?.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('✅ Nova versão instalada e pronta!');
          setState(prev => ({ ...prev, updateAvailable: true }));
        }
      });
    };

    // Listener para quando o service worker é atualizado
    const handleControllerChange = () => {
      console.log('🔄 Service Worker atualizado');
      window.location.reload();
    };

    // Listener para mensagens do service worker
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        console.log('📢 Atualização disponível recebida do SW');
        setState(prev => ({ ...prev, updateAvailable: true }));
      }
    };

    // Adiciona os listeners
    navigator.serviceWorker.addEventListener('message', handleMessage);
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    if (registration) {
      registration.addEventListener('updatefound', handleUpdateFound);
    }

    // Verifica atualizações periodicamente (a cada 30 minutos)
    const updateInterval = setInterval(checkForUpdates, 30 * 60 * 1000);

    // Verifica atualizações quando a aba fica ativa novamente
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForUpdates();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(updateInterval);
      
      if (registration) {
        registration.removeEventListener('updatefound', handleUpdateFound);
      }
    };
  }, [registration, checkForUpdates]);

  return {
    updateAvailable: state.updateAvailable,
    isUpdating: state.isUpdating,
    error: state.error,
    applyUpdate,
    dismissUpdate,
    checkForUpdates,
    clearError
  };
};
