import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import  bcrypt  from "bcryptjs";
import { db } from "@/server/db";

export async function POST(req: NextRequest) {
  const {  email, password } = await req.json();
  if ( !email || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
   
    const findUser = await db.user.findUnique({
      where: { email },
    });
    if (!findUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.hashedPassword);
    if (!isPasswordValid) { 
        return new Response(JSON.stringify({ error: "Invalid password" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const token = jwt.sign(
      {
        userId: findUser.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Couldn't login user. Please try again later.",
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

     
