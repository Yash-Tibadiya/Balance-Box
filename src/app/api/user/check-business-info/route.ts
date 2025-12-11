import { auth } from "@/lib/auth";
import { hasBusinessInfo } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized", hasBusinessInfo: false },
        { status: 401 }
      );
    }

    const completed = await hasBusinessInfo(session.user.id);

    return NextResponse.json({ hasBusinessInfo: completed }, { status: 200 });
  } catch (error) {
    console.error("Error checking business info:", error);
    return NextResponse.json(
      { error: "Internal server error", hasBusinessInfo: false },
      { status: 500 }
    );
  }
}
