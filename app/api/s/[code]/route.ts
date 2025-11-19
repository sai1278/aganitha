import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const link = await prisma.shortLink.findUnique({ where: { slug } });
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.shortLink.update({
    where: { slug },
    data: { clicks: link.clicks + 1 },
  });

  return NextResponse.redirect(link.url);
}
