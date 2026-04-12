import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import Listing from "@/models/Listing";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, listingId } = await req.json();

    if (!name || !email || !message || !listingId) {
      return NextResponse.json(
        { message: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      listing: listingId,
      agent: listing.agent,
    });

    return NextResponse.json(
      { message: "Inquiry sent successfully", inquiry },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agentId");

    if (!agentId) {
      return NextResponse.json(
        { message: "Agent ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const inquiries = await Inquiry.find({ agent: agentId })
      .populate("listing", "title location price type")
      .sort({ createdAt: -1 });

    return NextResponse.json({ inquiries });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}