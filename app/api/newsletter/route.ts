import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // 👉 TEMP: simulate saving (replace with DB later)
    console.log("New subscriber:", email);

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
