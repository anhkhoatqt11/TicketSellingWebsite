import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';


export async function GET(request: Request) {
  const session = await getSession();
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = parseInt(searchParams?.get('page')); // Retrieves the value of the 'skip' parameter
  const limit = parseInt(searchParams?.get('limit')); // Retrieves the value of the 'limit' parameter
  const searchWord = searchParams.get('name');



  if (session?.user?.role !== 'admin') {
    return new Response(JSON.stringify({ message: "You don't have access to this information." }), {
      status: 404,
    });
  }

  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      name: {
        contains: searchWord || '',
      },
    },
  });
  const countItem = await prisma.user.count({
    where: {
      name: {
        contains: searchWord || '',
      },
    },
  });
  const data = {
    data: users,
    totalPages: Math.ceil(countItem / limit),
    totalItems: users.length,
  }

  return new Response(JSON.stringify(data), { status: 200 });
}