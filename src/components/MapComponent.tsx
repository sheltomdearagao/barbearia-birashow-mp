
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

// Componente de Mapa simplificado usando Google Maps iFrame
const MapComponent = () => {
  // --- DADOS CORRIGIDOS DA LOCALIZAÇÃO ---
  // Endereço exato para os links de rota e fallback
  const barbershopAddress = 'Rua Heide Carneiro, 50 - Trobogy, Salvador - BA, 41745-135';
  
  // Coordenadas [longitude, latitude] extraídas do seu iFrame para precisão
  const barbershopCoords: [number, number] = [-38.409265, -12.928895];

  // URL de incorporação do Google Maps que você forneceu
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5499.410269065784!2d-38.40926489396689!3d-12.928894780387067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71610b41b2a5cc1%3A0x82a85e5736a1f597!2sR.%20Heide%20Carneiro%2C%2050%20-%20Trobogy%2C%20Salvador%20-%20BA%2C%2041745-135!5e0!3m2!1spt-BR!2sbr!4v1751388487008!5m2!1spt-BR!2sbr";

  /**
   * Abre o Google Maps focado na localização da barbearia.
   */
  const handleGoogleMapsClick = () => {
    const encodedAddress = encodeURIComponent(barbershopAddress);
    // Este link universal busca pelo endereço no Google Maps
    const googleMapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * Tenta obter a localização do usuário para traçar uma rota.
   * - Usa Apple Maps no iOS.
   * - Usa Google Maps nos outros sistemas (Android, Desktop).
   * - Tem um fallback inteligente caso o usuário negue a permissão de localização.
   */
  const handleGetDirections = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const destinationAddress = encodeURIComponent(barbershopAddress);
    // A ordem para URLs de rota é sempre latitude,longitude
    const destinationCoords = `${barbershopCoords[1]},${barbershopCoords[0]}`;

    // Tenta usar a geolocalização para uma rota "daqui até lá"
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Sucesso: obteve a localização do usuário
          const { latitude, longitude } = position.coords;
          const startCoords = `${latitude},${longitude}`;
          
          const url = isIOS
            ? `https://maps.apple.com/?saddr=${startCoords}&daddr=${destinationCoords}`
            : `https://www.google.com/maps/dir/${startCoords}/${destinationCoords}`;
          
          window.open(url, '_blank', 'noopener,noreferrer');
        },
        () => {
          // Erro ou permissão negada: abre as direções apenas com o destino
          const url = isIOS
            ? `https://maps.apple.com/?daddr=${destinationAddress}`
            : `https://www.google.com/maps/dir/?api=1&destination=${destinationAddress}`;
          
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      );
    } else {
      // Geolocalização não suportada: abre as direções apenas com o destino
      const url = isIOS
        ? `https://maps.apple.com/?daddr=${destinationAddress}`
        : `https://www.google.com/maps/dir/?api=1&destination=${destinationAddress}`;

      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative bg-barbershop-slate border border-barbershop-steel rounded-lg p-4 shadow-lg">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-barbershop-copper mr-3" />
        <div>
          <h4 className="text-barbershop-cream font-bold text-lg">Barbearia Bira Show</h4>
          <p className="text-barbershop-cream/80 text-sm">{barbershopAddress}</p>
        </div>
      </div>
      
      {/* Mapa incorporado via iFrame */}
      <div className="w-full h-full rounded-md overflow-hidden border-2 border-barbershop-steel">
        <iframe
          src={googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da Barbearia Bira Show"
        ></iframe>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          onClick={handleGetDirections}
          variant="outline"
          className="flex-1 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream transition-colors duration-300"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Ver Rota
        </Button>
        <Button
          onClick={handleGoogleMapsClick}
          variant="outline"
          className="flex-1 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream transition-colors duration-300"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Abrir no App de Mapas
        </Button>
      </div>
    </div>
  );
};

export default MapComponent;
