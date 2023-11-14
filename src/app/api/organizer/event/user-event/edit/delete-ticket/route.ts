import prisma from '@/lib/prisma';
import { toast } from 'react-hot-toast';

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const id = parseInt(searchParams?.get('id'));
  console.log("deleteeeee ikkkkkkkkkkk")

  const ticket = await prisma.ve.deleteMany({
    where: {
        id: id
    },
  });
  if (ticket) {
    return new Response(JSON.stringify(ticket), { status: 200 });
  }
}