import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateBusinessInfo } from "@/models/users";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      phone,
      businessAddress,
      businessCity,
      businessState,
      businessCountry,
      businessZip,
    } = body;

    // Validate required fields
    if (
      !businessName ||
      !phone ||
      !businessAddress ||
      !businessCity ||
      !businessState ||
      !businessCountry ||
      !businessZip
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await updateBusinessInfo({
      userId: session.user.id,
      businessName,
      phone,
      businessAddress,
      businessCity,
      businessState,
      businessCountry,
      businessZip,
    });

    return NextResponse.json(
      { message: "Business information updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating business info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
