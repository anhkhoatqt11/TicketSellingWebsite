import prisma from "@/lib/prisma";

export async function GET(request:Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const coupon = searchParams.get('coupon');
    
    const maGiamGia = await prisma.maGiamGia.findMany({
        where: {
            maGiamGia: {
                equals: coupon?.toString(),
            }
        },
    })
    if (!maGiamGia)
    return  new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
        status: 404,
      });
    return new Response(JSON.stringify(maGiamGia), { status: 200 });
}