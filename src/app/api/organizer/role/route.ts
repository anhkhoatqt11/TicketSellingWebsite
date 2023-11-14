import prisma from '@/lib/prisma';
import { select } from '@nextui-org/react';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = parseInt(searchParams?.get('userId'));
 
  const organizer = await prisma.user.findMany({
    where: {
        id: {
            equals: userId
        }
    },
    select: {
        role: true,
        loaiHinhKinhDoanh: true,
    }
  });

  return new Response(JSON.stringify(organizer), { status: 200 });
}