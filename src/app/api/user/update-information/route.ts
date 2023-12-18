import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.update({
    where: {
      id: body?.id,
    },
    data: {
      ...body,
    },
  });
  if (user) {
    return new Response(JSON.stringify(user), { status: 200 });
  }
}
