import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = searchParams.get('id');
  if (!userId) {
    return { status: 400, body: { message: 'userId is required' } };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });
  if (!user) {
    return { status: 400, body: { message: 'user not found' } };
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
