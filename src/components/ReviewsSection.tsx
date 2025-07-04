
import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ReviewForm from './ReviewForm';

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const reviews = [
    {
      id: 1,
      name: "Carlos Silva",
      rating: 5,
      comment: "Excelente atendimento! O Ricardo é um profissional excepcional. Saí de lá me sentindo renovado.",
      date: "Dezembro 2024"
    },
    {
      id: 2,
      name: "João Santos",
      rating: 5,
      comment: "Ambiente acolhedor e serviço de primeira qualidade. Recomendo para todos os amigos!",
      date: "Novembro 2024"
    },
    {
      id: 3,
      name: "Pedro Oliveira",
      rating: 5,
      comment: "Melhor barbearia de Salvador! Atendimento impecável e resultado sempre perfeito.",
      date: "Novembro 2024"
    },
    {
      id: 4,
      name: "Rafael Costa",
      rating: 5,
      comment: "Profissionais experientes e ambiente muito agradável. Sempre saio satisfeito!",
      date: "Outubro 2024"
    },
    {
      id: 5,
      name: "Lucas Ferreira",
      rating: 5,
      comment: "Tradição e qualidade em cada corte. É aqui que todo homem deveria vir!",
      date: "Outubro 2024"
    },
    {
      id: 6,
      name: "André Souza",
      rating: 5,
      comment: "Atendimento personalizado e resultado sempre além das expectativas. Top!",
      date: "Setembro 2024"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-barbershop-copper fill-barbershop-copper' : 'text-barbershop-slate'
        }`}
      />
    ));
  };

  // Auto-rotate reviews every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="py-16 lg:py-24 bg-barbershop-charcoal">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-oswald font-bold text-barbershop-cream mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-barbershop-cream/70 text-lg max-w-2xl mx-auto">
            Veja os depoimentos de quem já experimentou nossos serviços
          </p>
        </div>

        {/* Reviews Carousel - Single Card */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0">
                  <Card className="bg-barbershop-slate border-barbershop-steel hover:border-barbershop-copper/50 transition-all duration-500 mx-4">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <Quote className="h-8 w-8 text-barbershop-copper mx-auto mb-4" />
                        
                        <div className="flex justify-center mb-4">
                          {renderStars(review.rating)}
                        </div>
                        
                        <p className="text-barbershop-cream/90 mb-6 leading-relaxed text-lg italic">
                          "{review.comment}"
                        </p>
                        
                        <div className="border-t border-barbershop-steel/30 pt-4">
                          <span className="text-barbershop-copper font-semibold text-xl block mb-1">
                            {review.name}
                          </span>
                          <span className="text-barbershop-cream/60 text-sm">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots indicator - 80% smaller */}
          <div className="flex justify-center mt-8 space-x-1.5">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-barbershop-copper w-6' 
                    : 'bg-barbershop-steel hover:bg-barbershop-copper/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review Form */}
        <ReviewForm />
      </div>
    </section>
  );
};

export default ReviewsSection;
