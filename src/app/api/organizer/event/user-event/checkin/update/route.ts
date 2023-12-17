import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();


    const order = await prisma.hoaDon.update({
        where: {
           id: body?.id,
        },
        data: {
            ...body
        },
    })

    if (!order)
        return new Response(JSON.stringify({ message: 'Cập nhật trạng thái thất bại' }), {
            status: 404,
        });
    return new Response(JSON.stringify(order), { status: 200 });
}

