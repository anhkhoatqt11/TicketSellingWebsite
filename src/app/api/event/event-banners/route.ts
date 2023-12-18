import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const banners = await prisma.banners.findMany({
        include: {
            suKien: {},
        }
    })
    if (!banners)
        return new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
            status: 404,
        });
    return new Response(JSON.stringify(banners), { status: 200 });
}