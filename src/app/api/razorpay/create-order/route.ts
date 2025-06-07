import { db } from '@/server/db';
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { configDotenv } from 'dotenv'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { orderId, amount } = await req.json();

    // Get the order from database
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount.toString(),
      currency: 'INR',
      receipt: order.transactionId,
      notes: {
        orderId: order.id,
      },
    });

    // Update order with Razorpay order ID
    await db.order.update({
      where: { id: orderId },
      data: {
        razorpayOrderId: razorpayOrder.id,
      },
    });

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}