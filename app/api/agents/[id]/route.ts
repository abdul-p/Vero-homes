import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Listing from "@/model/Listing";
import User from "@/model/User";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Agent not found" },
        { status: 404 },
      );
    }

    await connectDB();

    const agent = await User.findOne({ _id: id, role: "agent" })
      .select("name email phone avatar createdAt")
      .lean();

    if (!agent) {
      return NextResponse.json(
        { message: "Agent not found" },
        { status: 404 },
      );
    }

    const listings = await Listing.find({
      agent: id,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      agent: {
        _id: agent._id.toString(),
        name: agent.name,
        email: agent.email,
        phone: agent.phone || "",
        avatar: agent.avatar || "",
        createdAt: agent.createdAt,
        listingsCount: listings.length,
      },
      listings: listings.map((listing: any) => ({
        ...listing,
        _id: listing._id.toString(),
        agent: listing.agent.toString(),
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
