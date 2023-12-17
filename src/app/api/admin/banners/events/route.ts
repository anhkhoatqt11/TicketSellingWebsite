import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = parseInt(searchParams?.get('page')); // Retrieves the value of the 'skip' parameter
  const searchWord = searchParams.get('name');

  const event = await prisma.suKien.findMany({
    include: {
      ChuDe: true,
    },
    where: {
      name: {
        contains: searchWord || ""
      }, 
    }
  });
  const countItem = await prisma.suKien.count({
    where: {
      name: {
        contains: searchWord || '',
      },
    },
  });
  return new Response(JSON.stringify(event), { status: 200 });
}