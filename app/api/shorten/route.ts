import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  const slug = Math.random().toString(36).substring(2, 8);
  await prisma.shortLink.create({ data: { slug, url } });

  return NextResponse.json({ shortUrl: `http://localhost:3000/s/${slug}` });
}
