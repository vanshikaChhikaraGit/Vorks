'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center justify-center">
        <Image
        src={'/emptycart.png'}
        alt='cart'
        height={150}
        width={150}
        className='mb-4'
        >
        </Image>
        <p className='text-sm text0gray-600 m-4'>Your cart seems empty for now </p>
          <Link href="/home">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="border-b py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">Duration: {item.duration}</p>
                  <p className="text-sm text-gray-600">Price: ₹{item.price} x {item.quantity}</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (18% gst)</span>
              <span>₹{(totalAmount * 0.18).toFixed(2)}</span> {/* Assuming 18% GST */}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{(totalAmount * 1.18).toFixed(2)}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="block mt-6">
              <Button className="w-full py-6 text-lg">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;