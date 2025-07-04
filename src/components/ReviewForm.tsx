
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim() || rating === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos e selecione uma avaliação.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular envio da avaliação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Avaliação enviada!",
        description: "Obrigado pelo seu feedback. Sua avaliação será analisada em breve.",
      });
      
      // Limpar formulário
      setName('');
      setComment('');
      setRating(0);
      setHoveredRating(0);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <Card className="bg-barbershop-slate border-barbershop-steel max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-barbershop-cream text-center">
          Deixe sua avaliação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-barbershop-cream mb-2">
              Seu nome
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream placeholder:text-barbershop-cream/50 focus:border-barbershop-copper"
              required
            />
          </div>

          {/* Avaliação por estrelas */}
          <div>
            <label className="block text-barbershop-cream mb-2">
              Sua avaliação
            </label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => {
                const starRating = i + 1;
                const isActive = starRating <= (hoveredRating || rating);
                
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStarClick(starRating)}
                    onMouseEnter={() => handleStarHover(starRating)}
                    onMouseLeave={handleStarLeave}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        isActive 
                          ? 'text-barbershop-copper fill-barbershop-copper' 
                          : 'text-barbershop-slate hover:text-barbershop-copper/50'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comentário */}
          <div>
            <label htmlFor="comment" className="block text-barbershop-cream mb-2">
              Seu comentário
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos sobre sua experiência..."
              rows={4}
              className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream placeholder:text-barbershop-cream/50 focus:border-barbershop-copper resize-none"
              required
            />
          </div>

          {/* Botão de envio */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full copper-gradient text-barbershop-cream font-semibold hover:scale-105 transition-transform"
          >
            {isSubmitting ? (
              "Enviando..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar Avaliação
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
