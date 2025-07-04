import React from 'react';
import { X, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePWA } from '@/hooks/usePWA';

const InstallPrompt = () => {
  const { showInstallPrompt, isIOS, isAndroid, canInstallDirectly, installApp, hideInstallPrompt } = usePWA();

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-barbershop-charcoal border-barbershop-copper/20 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-barbershop-cream flex items-center gap-2">
              <Download className="h-5 w-5 text-barbershop-copper" />
              Instalar App
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={hideInstallPrompt}
              className="text-barbershop-cream/60 hover:text-barbershop-cream h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-barbershop-cream/80 text-sm">
            Instale nosso app para uma experiência mais rápida e acesso offline!
          </p>
          
          {isIOS ? (
            <div className="space-y-3">
              <div className="bg-barbershop-slate/50 p-3 rounded-lg">
                <p className="text-barbershop-cream text-sm font-medium mb-2">
                  Para instalar no iOS:
                </p>
                <ol className="text-barbershop-cream/80 text-xs space-y-1 ml-4">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-barbershop-copper text-barbershop-dark rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Toque no ícone <Share className="h-3 w-3 inline" /> (Compartilhar)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-barbershop-copper text-barbershop-dark rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Selecione "Adicionar à Tela de Início"
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-barbershop-copper text-barbershop-dark rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Confirme tocando em "Adicionar"
                  </li>
                </ol>
              </div>
              <Button
                onClick={hideInstallPrompt}
                className="w-full bg-barbershop-copper hover:bg-barbershop-bronze text-barbershop-cream"
              >
                Entendi
              </Button>
            </div>
          ) : isAndroid && canInstallDirectly ? (
            <div className="space-y-3">
              <Button
                onClick={installApp}
                className="w-full bg-barbershop-copper hover:bg-barbershop-bronze text-barbershop-cream flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Instalar Agora
              </Button>
              <Button
                variant="ghost"
                onClick={hideInstallPrompt}
                className="w-full text-barbershop-cream/60 hover:text-barbershop-cream"
              >
                Mais tarde
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-barbershop-slate/50 p-3 rounded-lg">
                <p className="text-barbershop-cream text-sm font-medium mb-2">
                  Para instalar no Android:
                </p>
                <ol className="text-barbershop-cream/80 text-xs space-y-1 ml-4">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-barbershop-copper text-barbershop-dark rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Toque no menu ⋮ do navegador
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-barbershop-copper text-barbershop-dark rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Selecione "Adicionar à tela inicial"
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-barbershop-copper text-barbershop-dark rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Confirme tocando em "Adicionar"
                  </li>
                </ol>
              </div>
              <Button
                onClick={hideInstallPrompt}
                className="w-full bg-barbershop-copper hover:bg-barbershop-bronze text-barbershop-cream"
              >
                Entendi
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallPrompt;