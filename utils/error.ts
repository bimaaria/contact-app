import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const handleError = (err: any) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      notFound();
    }
  }

  internalServerError();
};

export const badRequest = () => {
  return NextResponse.json(
    { error: "Bad Request" },
    {
      status: 400,
    }
  );
};

export const unauthorized = () => {
  return NextResponse.json(
    { error: "Unauthorized" },
    {
      status: 401,
    }
  );
};

export const notFound = () => {
  return NextResponse.json(
    { error: "Not Found" },
    {
      status: 404,
    }
  );
};

export const internalServerError = () => {
  return NextResponse.json(
    { error: "Internal Server Error" },
    {
      status: 500,
    }
  );
};
