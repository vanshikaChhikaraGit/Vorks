import { Button } from '@/components/ui/button';
import { db } from '@/server/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface OrderConfirmationPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      items: {
        include: {
          service: true,
        },
      },
      user: true,
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="font-bold">Thank you for your order!</p>
        <p>Your payment has been successfully processed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className=" dark:bg-black bg-white p-6 rounded-lg shadow">
            <p className="mb-2">
              <span className="font-semibold">Order ID:</span> {order.transactionId}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span> {order.status}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Payment Status:</span> {order.paymentStatus}
            </p>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4">Items Ordered</h2>
          <div className="dark:bg-black bg-white p-6 rounded-lg shadow">
            {order.items.map((item) => (
              <div key={item.id} className="border-b py-4">
                <h3 className="font-medium">{item.service.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
          <div className=" dark:bg-black bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{order.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (18%):</span>
              <span>₹{order.tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/home">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}