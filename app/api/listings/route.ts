import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Listing from "@/model/Listing";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const city = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const category = searchParams.get("category");

    const query: any = { status: "approved" };

    if (type) query.type = type;
    if (city) query["location.city"] = city;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (bedrooms) query.bedrooms = Number(bedrooms);
    if (category) query.category = category;

    const listings = await Listing.find(query)
      .populate("agent", "name email phone avatar")
      .sort({ createdAt: -1 });

    return NextResponse.json({ listings });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in" },
        { status: 401 },
      );
    }

    if (session.user.role !== "agent" && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Only agents can create listings" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      type,
      price,
      location,
      category,
      bedrooms,
      bathrooms,
      images,
    } = body;

    if (!title || !description || !type || !price || !location) {
      return NextResponse.json(
        { message: "Please fill in all required fields" },
        { status: 400 },
      );
    }

    await connectDB();

    const listing = await Listing.create({
      title,
      description,
      type,
      price,
      location,
      bedrooms,
      bathrooms,
      category,
      images: images || [],
      agent: session.user.id,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Listing created successfully", listing },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
