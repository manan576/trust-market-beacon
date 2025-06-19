
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  merchant: {
    name: string;
    creditTag: string;
  };
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const Cart = ({ items, onClose, onUpdateQuantity, onRemove }: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 25 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600">
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shopping Cart ({items.length} items)</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          {items.map(item => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">by {item.merchant.name}</p>
                <p className="text-lg font-bold">${item.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className={shipping === 0 ? 'text-green-600' : ''}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {subtotal < 25 && shipping > 0 && (
              <p className="text-sm text-gray-600">
                Add ${(25 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-lg py-3">
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
