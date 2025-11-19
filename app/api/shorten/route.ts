import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { url } = await req.json();

  const slug = nanoid(6);

  const newLink = await prisma.shortLink.create({
    data: { url, slug }
  });

  return NextResponse.json({ shortUrl: slug });
}
