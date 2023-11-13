import prisma from '@/lib/prisma';

export async function GET(request: Request) {

  const topic = await prisma.chuDe.findMany({
    
  });
  return new Response(JSON.stringify(topic), { status: 200 });
}