import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Inquiry from "@/model/Inquiry";
import Listing from "@/model/Listing";
import User from "@/model/User";

export async function GET() {
  try {
    await connectDB();

    const [propertiesListed, cities, verifiedAgents, happyClients] =
      await Promise.all([
        Listing.countDocuments({ status: "approved" }),
        Listing.distinct("location.city", { status: "approved" }),
        User.countDocuments({ role: "agent" }),
        Inquiry.countDocuments(),
      ]);

    return NextResponse.json({
      propertiesListed,
      citiesCovered: cities.length,
      verifiedAgents,
      happyClients,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
