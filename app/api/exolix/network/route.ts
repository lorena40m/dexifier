import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const networks = await prisma.network.findMany();

    return NextResponse.json(networks)
  } catch (error) {
    console.error("Error fetching networks", error);
    return NextResponse.json({ success: false })
  }
}