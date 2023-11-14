import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = parseInt(searchParams?.get('userId'))

  const event = await prisma.suKien.findFirst({
    where: {
      userId:{
        equals: userId,
      },
    },
    orderBy: {
        id: 'desc'
    }
  });

  return new Response(JSON.stringify(event), { status: 200 });
}