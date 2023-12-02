import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = searchParams.get('id');
  if (!userId) {
    return { status: 400, body: { message: 'userId is required' } };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      phoneNumber: true,
      diaChi: true,
      role: true,
      loaiHinhKinhDoanh: true,
      hoTenOrganizer: true,
      cccdNumber: true,
      maSoThueCaNhan: true,
      anhDaiDienToChuc: true,
      tenDoanhNghiep: true,
      maSoDKKD: true,
      noiCap: true,
      ngayCap: true,
      chiNhanh: true,
      soTaiKhoan: true,
      tenChuTaiKhoan: true,
      tenNganHang: true,
    }
  });
  if (!user) {
    return { status: 400, body: { message: 'user not found' } };
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
