import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const organizer = await prisma.user.update({
    where: {
        id: body?.id,
    },
    data: {
        ...body
    },
  });
  if (organizer) {
    return new Response(JSON.stringify(organizer), { status: 200 });
  }
}