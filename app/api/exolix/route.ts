
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const currencies = await prisma.currency.findMany({
      include: {
        network: true, // Include network details for each currency
      },
    });

    return NextResponse.json(currencies)
  } catch (error) {
    console.error("Error fetching currencies with networks:", error);
    return NextResponse.json({ success: false })
  }
}