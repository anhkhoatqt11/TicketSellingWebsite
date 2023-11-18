import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = parseInt(searchParams?.get('page')); // Retrieves the value of the 'skip' parameter
  const limit = parseInt(searchParams?.get('limit')); // Retrieves the value of the 'limit' parameter
  const userId = parseInt(searchParams?.get('userId'))
  const searchWord = searchParams.get('name');

  const event = await prisma.suKien.findMany({
    include: {
      ChuDe: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    where: {
      userId:{
        equals: userId,
      },
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
  const data = {
    data: event,
    totalPages: Math.ceil(countItem / limit),
    totalItems: event.length,
  };
  return new Response(JSON.stringify(data), { status: 200 });
}