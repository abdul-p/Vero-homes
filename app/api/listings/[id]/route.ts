import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Listing from "@/model/Listing";

// GET - fetch single listing (public)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const listing = await Listing.findById(id).populate(
      "agent",
      "name email phone avatar"
    );

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ listing });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// PATCH - update a listing (agent who owns it or admin)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in" },
        { status: 401 }
      );
    }

    await connectDB();

    const listing = await Listing.findById(params.id);

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    const isOwner = listing.agent.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to edit this listing" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const updated = await Listing.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      message: "Listing updated successfully",
      listing: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in" },
        { status: 401 }
      );
    }

    await connectDB();

    const listing = await Listing.findById(params.id);

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    const isOwner = listing.agent.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to delete this listing" },
        { status: 403 }
      );
    }

    await Listing.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Listing deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}