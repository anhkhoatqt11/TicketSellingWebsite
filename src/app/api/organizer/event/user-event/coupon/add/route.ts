import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const body = await req.json();


    const voucher = await prisma.maGiamGia.create({
        data: {
        SuKienId: body.SuKienId,
        VeId: body.VeId,
        ...body,
        },
    });
    if (voucher) {
        return new Response(JSON.stringify(voucher), { status: 200 });
    }
}