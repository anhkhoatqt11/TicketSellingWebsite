import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    const body = await request.json();

    const banners = await prisma.banners.update({
        where: {
            id: parseInt(id),
        },
        data: {
            ...body
        }
    })

    if (!banners)
        return new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
            status: 404,
        });
    return new Response(JSON.stringify(banners), { status: 200 });
}

