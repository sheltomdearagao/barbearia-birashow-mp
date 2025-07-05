import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/sales';
import { toast } from 'sonner';
import Cart from '@/components/Cart';

const ProductsSection = () => {
  const { addToCart } = useCart();
  
  const products: Product[] = [
    {
      id: '1',
      name: 'Pomada Fixadora Premium',
      brand: 'Gentleman\'s Choice',
      price: 65,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      description: 'Fixação forte com brilho natural. Ideal para estilos clássicos.',
      features: ['Base em água', 'Fixação 8h', 'Fácil remoção'],
      stock: 15,
      category: 'cabelo'
    },
    {
      id: '2',
      name: 'Óleo para Barba Artesanal',
      brand: 'Barber\'s Secret',
      price: 45,
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      description: 'Blend exclusivo de óleos naturais para hidratar e amaciar.',
      features: ['100% Natural', 'Fragrância amadeirada', 'Anti-ressecamento'],
      featured: true,
      stock: 23,
      category: 'barba'
    },
    {
      id: '4',
      name: 'Bálsamo Pós-Barba',
      brand: 'Urban Gentleman',
      price: 55,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      description: 'Alívio imediato após o barbear com propriedades cicatrizantes.',
      features: ['Base em gel', 'Efeito cooling', 'Vitamina E'],
      stock: 12,
      category: 'barbear'
    },
    {
      id: '5',
      name: 'Kit Manutenção Completo',
      brand: 'Master Barber',
      price: 120,
      image: 'https://images.unsplash.com/photo-1631730486887-4d76b58c8dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      description: 'Kit completo com tudo que você precisa para cuidados em casa.',
      features: ['5 produtos', 'Necessaire inclusa', 'Guia de uso'],
      stock: 6,
      category: 'kit'
    },
    {
      id: '6',
      name: 'Shampoo Anti-Caspa',
      brand: 'Pro Scalp',
      price: 38,
      image: 'https://images.unsplash.com/photo-1585847406913-3f5a67645b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.6,
      description: 'Fórmula especializada para couro cabeludo sensível.',
      features: ['Sem sulfato', 'Ação antifúngica', 'pH balanceado'],
      stock: 20,
      category: 'cabelo'
    }
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className={`bg-barbershop-slate border-barbershop-steel hover:border-barbershop-copper transition-all duration-300 hover:scale-105 ${product.featured ? 'ring-2 ring-barbershop-copper' : ''}`}>
      <CardContent className="p-0">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-barbershop-copper text-barbershop-cream text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full">
            Mais Vendido
          </div>
        )}

        {/* Image */}
        <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden rounded-t-lg">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Brand */}
          <p className="text-barbershop-copper text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="text-base sm:text-lg lg:text-xl font-oswald font-bold text-barbershop-cream mb-2 sm:mb-3">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="flex items-center">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-barbershop-copper fill-current" />
              <span className="text-barbershop-cream/80 text-xs sm:text-sm ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-barbershop-cream/60">
              Estoque: {product.stock}
            </span>
          </div>

          {/* Description */}
          <p className="text-barbershop-cream/80 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-4 sm:mb-6">
            <ul className="space-y-1 sm:space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-xs text-barbershop-cream/70">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-barbershop-copper rounded-full mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <span className="text-lg sm:text-xl font-bold text-barbershop-copper">
              R$ {product.price.toFixed(2)}
            </span>
            <Button 
              size="sm" 
              className={`h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm font-semibold ${product.featured ? 'copper-gradient hover:scale-105' : 'border border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream'} transition-all`} 
              variant={product.featured ? 'default' : 'outline'} 
              onClick={() => handleAddToCart(product)} 
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {product.stock === 0 ? 'Esgotado' : 'Comprar'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-barbershop-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-oswald font-bold text-barbershop-cream">
              Arsenal do Cavalheiro
            </h2>
            <Cart />
          </div>
          <p className="text-lg sm:text-xl text-barbershop-cream/80 max-w-3xl mx-auto leading-relaxed px-4">
            Produtos selecionados pelos nossos especialistas para manter seu estilo impecável em casa. 
            Qualidade profissional ao seu alcance.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel 
            className="w-full max-w-sm mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id}>
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream" />
            <CarouselNext className="border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
