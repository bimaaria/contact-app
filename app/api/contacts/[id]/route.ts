import { handleError } from "@/utils";
import { badRequest } from "@/utils/error";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const id = pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const contacts = await prisma.contact.findUniqueOrThrow({
      where: {
        id: +id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: contacts,
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const params = new URL(request.url).pathname;
  const id = params.split("/").pop();

  if (!id) {
    return badRequest();
  }

  try {
    const res = await prisma.contact.update({
      where: {
        id: +id,
      },
      data,
      select: {
        name: true,
        phone: true,
        email: true,
      },
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
