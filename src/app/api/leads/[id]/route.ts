import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Lead from "@/lib/db/models/Lead";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "globalvin-jwt-secret-key-2024-very-secure-random-string";

// Helper to verify super_admin
async function verifySuperAdmin(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  const cookieToken = request.cookies.get("authToken")?.value;
  const token = authHeader?.replace("Bearer ", "") || cookieToken;

  if (!token) return false;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    return decoded.role === "super_admin";
  } catch {
    return false;
  }
}

// DELETE - Delete a lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verifySuperAdmin(request))) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Lead delete error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update lead status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verifySuperAdmin(request))) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const { status } = await request.json();

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lead updated successfully",
      data: { lead: lead.toJSON() },
    });
  } catch (error) {
    console.error("Lead update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
