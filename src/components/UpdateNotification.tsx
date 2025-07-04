
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { X, RefreshCw, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppUpdater } from '@/hooks/useAppUpdater';
import { toast } from '@/hooks/use-toast';

const UpdateNotification = () => {
  const {
    updateAvailable,
    isUpdating,
    error,
    applyUpdate,
    dismissUpdate,
    clearError
  } = useAppUpdater();

  // Mostra toast quando há erro
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro de Atualização",
        description: error,
        variant: "destructive",
      });
      clearError();
    }
  }, [error, clearError]);

  // Mostra toast de sucesso quando a atualização está sendo aplicada
  useEffect(() => {
    if (isUpdating) {
      toast({
        title: "Atualizando...",
        description: "Aplicando a nova versão do aplicativo",
      });
    }
  }, [isUpdating]);

  if (!updateAvailable) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md">
      <Alert className="bg-barbershop-copper/10 border-barbershop-copper shadow-lg backdrop-blur-sm">
        <Download className="h-4 w-4 text-barbershop-copper" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-barbershop-dark">
              Nova versão disponível! 🎉
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={dismissUpdate}
              className="h-6 w-6 text-barbershop-dark/60 hover:text-barbershop-dark"
              disabled={isUpdating}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <AlertDescription className="text-barbershop-dark/80 mb-3">
            Uma nova versão da Barbearia Bira Show está pronta para ser instalada.
          </AlertDescription>

          {isUpdating && (
            <div className="mb-3">
              <Progress value={75} className="h-2" />
              <p className="text-xs text-barbershop-dark/60 mt-1">
                Aplicando atualização...
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={applyUpdate}
              disabled={isUpdating}
              className="flex-1 bg-barbershop-copper hover:bg-barbershop-bronze text-white"
              size="sm"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Atualizar Agora
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={dismissUpdate}
              disabled={isUpdating}
              size="sm"
              className="border-barbershop-copper/30 text-barbershop-dark hover:bg-barbershop-copper/10"
            >
              Depois
            </Button>
          </div>
          
          <p className="text-xs text-barbershop-dark/50 mt-2">
            💡 A atualização inclui melhorias e correções
          </p>
        </div>
      </Alert>
    </div>
  );
};

export default UpdateNotification;
