import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  // Retrieves the value of the 'skip' parameter
  const limit = parseInt(searchParams?.get("limit")); // Retrieves the value of the 'limit' parameter
  const searchWord = searchParams.get("searchWord");

  const events = await prisma.suKien.findMany({
    take: limit,
    where: {
      name: {
        contains: searchWord || "",
      },
    },
  });
  const countItem = await prisma.suKien.count({
    where: {
      name: {
        contains: searchWord || "",
      },
    },
  });
  const data = {
    data: events,
    totalPages: Math.ceil(countItem / limit),
    totalItems: events.length,
  };
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
