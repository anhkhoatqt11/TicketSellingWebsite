import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const voucher = await prisma.maGiamGia.update({
    where: {
        id: body?.id,
    },
    data: {
        ...body
    },
  });
  if (voucher) {
    return new Response(JSON.stringify(voucher), { status: 200 });
  }
}