
const CACHE_NAME = 'barbearia-salvador-v4'; // Incrementado para forçar atualização
const STATIC_CACHE = 'static-v4';
const DYNAMIC_CACHE = 'dynamic-v4';

const urlsToCache = [
  '/',
  '/booking',
  '/login',
  '/admin',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/lovable-uploads/b871dc44-8f2d-4ccc-9222-d3c418e1b872.png'
];

// Install event - mais agressivo para PWA
self.addEventListener('install', function(event) {
  console.log('🔧 SW Install - Nova versão sendo instalada');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function(cache) {
        console.log('📦 Cache aberto, adicionando recursos');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ SW instalado com sucesso');
        // Não forçar ativação imediatamente, aguardar sinal do cliente
        return;
      })
  );
});

// Activate event - limpar caches antigos e notificar clientes
self.addEventListener('activate', function(event) {
  console.log('🚀 SW Activate - Ativando nova versão');
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deletando cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Tomar controle de todos os clientes
      self.clients.claim().then(() => {
        console.log('👑 SW tomou controle dos clientes');
        
        // Notificar todos os clientes sobre a atualização
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            console.log('📢 Notificando cliente sobre atualização');
            client.postMessage({
              type: 'UPDATE_AVAILABLE',
              message: 'Nova versão disponível!'
            });
          });
        });
      })
    ])
  );
});

// Listener para mensagens dos clientes
self.addEventListener('message', function(event) {
  console.log('📨 Mensagem recebida:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('⏭️ Pulando espera, ativando nova versão');
    self.skipWaiting();
  }
});

// Fetch event - estratégia cache-first para melhor performance offline
self.addEventListener('fetch', function(event) {
  // Só interceptar requests GET
  if (event.request.method !== 'GET') return;
  
  // Não cachear requests de API ou dados dinâmicos
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('supabase') ||
      event.request.url.includes('mapbox')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(function(cachedResponse) {
        if (cachedResponse) {
          console.log('📋 Servindo do cache:', event.request.url);
          return cachedResponse;
        }
        
        return fetch(event.request)
          .then(function(response) {
            // Verificar se é uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonar a resposta para cache
            const responseToCache = response.clone();
            
            caches.open(DYNAMIC_CACHE)
              .then(function(cache) {
                console.log('💾 Adicionando ao cache:', event.request.url);
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(function(error) {
            console.log('❌ Fetch falhou:', error);
            
            // Para navegação, tentar servir página offline
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
            
            // Para outros recursos, retornar resposta vazia
            return new Response('', {
              status: 408,
              statusText: 'Offline'
            });
          });
      })
  );
});

// Push notification com melhor handling
self.addEventListener('push', function(event) {
  console.log('📱 Push recebido');
  
  let notificationData = {
    title: 'Barbearia Bira Show - Salvador',
    body: 'Você tem um agendamento hoje!',
    icon: '/lovable-uploads/b871dc44-8f2d-4ccc-9222-d3c418e1b872.png',
    badge: '/lovable-uploads/b871dc44-8f2d-4ccc-9222-d3c418e1b872.png',
    data: {
      url: '/booking'
    }
  };

  if (event.data) {
    try {
      const pushData = event.data.json();
      notificationData = { ...notificationData, ...pushData };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: notificationData.data,
    actions: [
      {
        action: 'view',
        title: 'Ver Agendamento',
        icon: notificationData.icon
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ],
    requireInteraction: true,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Notification click com melhor handling
self.addEventListener('notificationclick', function(event) {
  console.log('🔔 Notification click:', event.action);
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then(function(clientList) {
          // Tentar focar em uma janela existente
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url.includes(urlToOpen) && 'focus' in client) {
              return client.focus();
            }
          }
          
          // Se não encontrar, abrir nova janela
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// Background sync para funcionalidade offline
self.addEventListener('sync', function(event) {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implementar lógica de sincronização aqui
      Promise.resolve()
    );
  }
});

// Verificação periódica de atualizações
setInterval(() => {
  self.registration.update().then(() => {
    console.log('🔄 Verificação automática de atualização concluída');
  }).catch(error => {
    console.error('❌ Erro na verificação automática:', error);
  });
}, 30 * 60 * 1000); // A cada 30 minutos
