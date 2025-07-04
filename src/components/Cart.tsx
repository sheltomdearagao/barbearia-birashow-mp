
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast.error('Carrinho vazio');
      return;
    }
    
    toast.success('Compra realizada com sucesso!');
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cart.itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-barbershop-copper text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Carrinho vazio</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                {cart.items.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">{item.product.brand}</p>
                          <p className="font-bold text-barbershop-copper">
                            R$ {item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-barbershop-copper">
                    R$ {cart.total.toFixed(2)}
                  </span>
                </div>
                <Button 
                  className="w-full copper-gradient"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
