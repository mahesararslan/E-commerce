import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  try {
    const { search } = await req.json();

    if (!search) {
      return NextResponse.json({
        status: 400,
        message: "Search term is required",
      });
    }

    await mongooseConnect();

    // Update the user's recent searches with controlled length
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $push: {
          recentSearches: {
            $each: [search], // Add the new search
            $position: 0, // Add it to the start of the array
            $slice: 5, // Keep only the latest 5 searches
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    return NextResponse.json({
      status: 200,
      recentSearches: user.recentSearches,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
