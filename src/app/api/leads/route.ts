import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Lead from "@/lib/db/models/Lead";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "globalvin-jwt-secret-key-2024-very-secure-random-string";

// POST - Create a new lead (PUBLIC - no auth required)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, company, message, source } = body;

    // Validation
    if (!name || !email || !phone || !source) {
      return NextResponse.json(
        { message: "Name, email, phone and source are required" },
        { status: 400 }
      );
    }

    // Capture additional metadata
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Create new lead
    const lead = await Lead.create({
      name,
      email: email.toLowerCase(),
      phone,
      company: company || "",
      message: message || "",
      source,
      status: "new",
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        message: "Lead submitted successfully",
        data: { lead: lead.toJSON() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Get all leads (PROTECTED - super_admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    const cookieToken = request.cookies.get("authToken")?.value;
    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    let decoded: { userId: string; role: string };

    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Check if user is super_admin
    if (decoded.role !== "super_admin") {
      return NextResponse.json(
        { message: "Access denied. Super admin only." },
        { status: 403 }
      );
    }

    await connectDB();

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "100");

    // Build query
    const query: Record<string, string> = {};
    if (source && source !== "all") query.source = source;
    if (status && status !== "all") query.status = status;

    // Fetch leads with pagination
    const skip = (page - 1) * limit;
    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments(query),
    ]);

    // Get counts by source
    const [carfaxCount, autocheckCount, chineseApiCount, contactCount] =
      await Promise.all([
        Lead.countDocuments({ source: "carfax" }),
        Lead.countDocuments({ source: "autocheck" }),
        Lead.countDocuments({ source: "chinese-api" }),
        Lead.countDocuments({ source: "contact" }),
      ]);

    return NextResponse.json({
      data: {
        leads: leads.map((l) => l.toJSON()),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        stats: {
          total,
          carfax: carfaxCount,
          autocheck: autocheckCount,
          chineseApi: chineseApiCount,
          contact: contactCount,
        },
      },
    });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
