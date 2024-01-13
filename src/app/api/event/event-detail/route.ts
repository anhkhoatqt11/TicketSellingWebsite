import prisma from "@/lib/prisma";

export async function GET(request:Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = parseInt(searchParams.get('id'));
    
    const event = await prisma.suKien.findMany({
        where: {
            id: {
                equals: id
            }
        },
        include: {
            ves: true,
            user: {
                select: {
                    id: true,
                    name:true,
                    phoneNumber:true,
                    email:true,
                    diaChi:true,
                    avatar: true,
                    loaiHinhKinhDoanh: true,
                    hoTenOrganizer: true,
                    anhDaiDienToChuc: true,
                    tenDoanhNghiep: true,
                }
            }
        }
    })
    if (!event)
    return  new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
        status: 404,
      });
    return new Response(JSON.stringify(event), { status: 200 });
}