import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function ShortRedirect({ params }: any) {
  const { slug } = params;

  const link = await prisma.shortLink.findUnique({
    where: { slug }
  });

  if (!link) return redirect("/");

  await prisma.shortLink.update({
    where: { slug },
    data: { clicks: link.clicks + 1 }
  });

  return redirect(link.url);
}
