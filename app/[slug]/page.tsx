import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

interface ShortRedirectProps {
  params: {
    slug: string;
  };
}

export default async function ShortRedirect({ params }: ShortRedirectProps) {
  const { slug } = params;

  // Find the short link by slug
  const link = await prisma.shortLink.findUnique({
    where: { slug },
  });

  // If not found, go to homepage
  if (!link) {
    return redirect("/");
  }

  // Increment click count
  await prisma.shortLink.update({
    where: { slug },
    data: { clicks: link.clicks + 1 },
  });

  // Redirect to the original URL
  return redirect(link.url);
}
