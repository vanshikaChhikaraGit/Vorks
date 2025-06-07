import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { db } from '@/server/db';
import { configDotenv } from 'dotenv'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId,
    } = await req.json();

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Update order and create payment record
  const result = await db.$transaction(async (tx) => {
  const updatedOrder = await tx.order.update({
    where: { id: orderId },
    data: {
      status: 'COMPLETED',
      paymentStatus: 'CAPTURED',
      razorpayPaymentId: razorpay_payment_id,
    },
  });

  const payment = await tx.payment.create({
    data: {
      orderId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      amount: updatedOrder.totalAmount, // Now properly typed
      status: 'CAPTURED',
      signature: razorpay_signature,
    },
  });

  return { updatedOrder, payment };
});

    return NextResponse.json({
      success: true,
      order: result.updatedOrder,
      payment:result.payment,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}