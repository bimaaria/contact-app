import { handleError } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  let contacts: any = [];
  try {
    if (searchParams.has("name")) {
      const query = `%${searchParams.get("name")}%`;
      contacts =
        await prisma.$queryRaw`SELECT * FROM contacts WHERE name LIKE ${query}`;
    } else {
      contacts = await prisma.contact.findMany();
    }

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: contacts,
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const res = await prisma.contact.create({
      data,
    });

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: res,
    });
  } catch (error) {
    return handleError(error);
  }
}
