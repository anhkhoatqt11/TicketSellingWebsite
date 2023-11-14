import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const body = await req.json();


    const event = await prisma.suKien.create({
        data: {
        userId: body.userId,
        ...body,
        },
    });
    if (event) {
        return new Response(JSON.stringify(event), { status: 200 });
    }
}