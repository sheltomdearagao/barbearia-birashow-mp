
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
          <div className="absolute top-4 left-4 z-10 bg-barbershop-copper text-barbershop-cream text-sm font-semibold px-3 py-1 rounded-full">
            Mais Vendido
          </div>
        )}

        {/* Image */}
        <div className="relative h-48 lg:h-56 overflow-hidden rounded-t-lg">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Brand */}
          <p className="text-barbershop-copper text-sm font-medium mb-1">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="text-lg lg:text-xl font-oswald font-bold text-barbershop-cream mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-barbershop-copper fill-current" />
              <span className="text-barbershop-cream/80 text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-xs text-barbershop-cream/60">
              Estoque: {product.stock}
            </span>
          </div>

          {/* Description */}
          <p className="text-barbershop-cream/80 text-sm mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <ul className="space-y-1">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-xs text-barbershop-cream/70">
                  <span className="w-1 h-1 bg-barbershop-copper rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-barbershop-copper">
              R$ {product.price.toFixed(2)}
            </span>
            <Button 
              size="sm" 
              className={`${product.featured ? 'copper-gradient' : 'border border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream'} transition-all`} 
              variant={product.featured ? 'default' : 'outline'} 
              onClick={() => handleAddToCart(product)} 
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {product.stock === 0 ? 'Esgotado' : 'Comprar'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="products" className="py-16 lg:py-24 bg-barbershop-charcoal">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl lg:text-5xl font-oswald font-bold text-barbershop-cream">
              Arsenal do Cavalheiro
            </h2>
            <Cart />
          </div>
          <p className="text-lg lg:text-xl text-barbershop-cream/80 max-w-3xl mx-auto">
            Produtos selecionados pelos nossos especialistas para manter seu estilo impecável em casa. 
            Qualidade profissional ao seu alcance.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

        {/* Bottom CTA */}
        <div className="mt-12 lg:mt-16 text-center">
          
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
