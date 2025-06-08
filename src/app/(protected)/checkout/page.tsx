'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { configDotenv } from 'dotenv'

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const router = useRouter();

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Rest of your existing code...
  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const totalAmount = subtotal + tax;

  useEffect(() => {
    const createOrder = async () => {
      if (cart.length === 0) return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cart,
            subtotal,
            tax,
            totalAmount,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create order');
        setOrderId(data.order.id);
      } catch (error) {
        console.error('Error creating order:', error);
        alert('Failed to create order. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    createOrder();
  }, [cart, subtotal, tax, totalAmount]);

  const initiatePayment = async () => {
    if (!orderId || !razorpayLoaded) {
      alert('Payment system is still loading. Please try again in a moment.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: totalAmount * 100,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create payment order');

      const options = {
        key: 'RAZORPAY_SECRET_KEY', // Use public key
        amount: data.amount,
        currency: "INR",
        name: "Vorks",
        description: "Payment for Ordered Services",
        order_id: data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verificationResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              }),
            });

            if (verificationResponse.ok) {
              clearCart();
              router.push(`/order-confirmation/${orderId}`);
            } else {
              const errorData = await verificationResponse.json();
              alert('Payment verification failed: ' + errorData.message);
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Error verifying payment. Please contact support.');
          }
        },
        prefill: {
          name: "vanshika",
          email: "vanshikachhikaraxyz@gmail.com",
          contact: "9306761520",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/home">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            {cart.map((item) => (
              <div key={item.id} className="border-b py-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">Duration: {item.duration}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.price} x {item.quantity}</p>
              </div>
            ))}
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <Button 
              className="w-full py-6 text-lg" 
              onClick={initiatePayment}
              disabled={!orderId || !razorpayLoaded || loading}
            >
              {loading ? 'Processing...' : `Pay ₹${totalAmount.toFixed(2)}`}
            </Button>
            {!razorpayLoaded && (
              <p className="text-sm text-gray-500 mt-2">Loading payment system...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;