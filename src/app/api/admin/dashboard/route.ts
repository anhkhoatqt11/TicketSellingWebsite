import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";


export async function GET(request: Request) {
  
  const session = await getSession();

  if (session?.user?.role !== 'admin') {
    return new Response(JSON.stringify({ message: "You don't have access to this information." }), {
      status: 404,
    });
  }
  
  const countItemUser = await prisma.user.count();
  const countItemEvent = await prisma.suKien.count();
  const countItemTicket = await prisma.ve.count();

  // Calculate the sum of tongTien in hoaDon where tinhTrang is 'Đã thanh toán'
  const countRevenue = await prisma.hoaDon.aggregate({
    where: {
      tinhTrang: {
        equals: 'Đã thanh toán'
      }
    },
    _sum: {
      tongTien: true
    }
  });

  const countOrganizer = await prisma.user.count({
    where: {
      role: {
        equals: 'organizer'
      }
    },
  });

  const data = {
    requestDate: new Date(),
    totalUser: countItemUser,
    totalEvent: countItemEvent,
    totalOrganizer: countOrganizer,
    totalTicket: countItemTicket,
    totalRevenue: countRevenue._sum.tongTien || 0, // Access the sum, or default to 0 if undefined
  };

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
