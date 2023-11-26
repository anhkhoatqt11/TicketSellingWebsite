import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const countItem = await prisma.user.count();

  const data = {
    requestDate: new Date(),
    totalItems: countItem,
  };

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
