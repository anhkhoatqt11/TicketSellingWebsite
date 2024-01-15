import prisma from "@/lib/prisma";

export async function GET(request:Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = parseInt(searchParams.get('id'));
    
    console.log(searchParams.get('apptransid'));

    const order = await prisma.hoaDon.findMany({
        where: {
            id: {
                equals: id
            }
        },
        include: {
            HoaDonVe:true
        }
    })
    if (!order)
    return  new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
        status: 404,
      });
    return new Response(JSON.stringify(order), { status: 200 });
}