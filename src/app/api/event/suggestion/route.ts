import prisma from "@/lib/prisma";
export async function GET(request: Request) {
  const events = await prisma.suKien.findMany({
    include: {
      ves: true,
    },
    where: {
      trangThai: "Đã duyệt",
      ngayKetThuc: {
        gte: new Date(),
      },
    },
    orderBy: {
        ngayKetThuc: "desc"
    },
    take: 6,
  });

  return new Response(JSON.stringify(events), {
    status: 200,
  });
}
