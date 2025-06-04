// validate user input
// generate hash password
// store user and hashed password in db
// generate JWT token
//set cookie with jwt token
//return response or error

import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import  bcrypt  from "bcryptjs";
import { db } from "@/server/db";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userExists = await db.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Create user in the database
    const newUser = await db.user.create({
      data: {
        name,
        email,
        hashedPassword: hash,
      },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
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
        error: "Couldn't signup user. Please try again later.",
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
