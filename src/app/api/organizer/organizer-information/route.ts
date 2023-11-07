import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = parseInt(searchParams?.get('userId'));
 
  const organizer = await prisma.user.findMany({
    where: {
        id: {
            equals: userId
        }
    }
  });

  return new Response(JSON.stringify(organizer), { status: 200 });
}