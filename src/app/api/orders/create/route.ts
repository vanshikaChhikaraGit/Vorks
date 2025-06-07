import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import { auth } from '@clerk/nextjs';
import { cookies } from 'next/headers';
import { db } from '@/server/db';

export async function POST(req: Request) {
  try {
     const cookie = await cookies();
        const userId = cookie.get("userId")?.value;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, subtotal, tax, totalAmount } = await req.json();

    // Generate transaction ID (e.g., #trn-345)
    const transactionId = `trn-${Math.floor(Math.random() * 10000)}`;

    // Create order in database
    const order = await db.order.create({
      data: {
        transactionId,
        userId,
        amount: subtotal,
        tax,
        totalAmount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            serviceId: item.id,
            quantity: item.quantity,
            price: parseFloat(item.price),
            duration: item.duration,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}