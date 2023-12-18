import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');

    const deletedBanner = await prisma.banners.delete({
        where: {
            id: parseInt(id),
        },
    });

    if (!deletedBanner)
        return new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
            status: 404,
        });

    return new Response(JSON.stringify({ message: 'Banner deleted successfully' }), { status: 200 });
}
