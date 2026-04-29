import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Listing from "@/model/Listing";
import User from "@/model/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 0);

    const query = User.find({ role: "agent" })
      .select("name email phone avatar createdAt")
      .sort({ createdAt: -1 })
      .lean();

    if (limit > 0) query.limit(limit);

    const users = await query;

    const agents = await Promise.all(
      users.map(async (agent: any) => {
        const listingsCount = await Listing.countDocuments({
          agent: agent._id,
          status: "approved",
        });

        return {
          _id: agent._id.toString(),
          name: agent.name,
          email: agent.email,
          phone: agent.phone || "",
          avatar: agent.avatar || "",
          createdAt: agent.createdAt,
          listingsCount,
        };
      }),
    );

    return NextResponse.json({ agents });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
