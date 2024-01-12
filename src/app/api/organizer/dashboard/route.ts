import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";


export async function GET(request: Request) {
  const session = await getSession();

  if (session?.user?.role !== 'organizer') {
    return new Response(JSON.stringify({ message: "You don't have access to this information." }), {
      status: 404,
    });
  }
  
  const countItemEvent = await prisma.suKien.count({
    where: {
        userId: session?.user?.id,
    }
  });
  const countItemTicket = await prisma.ve.count({
    where: {
        suKien: {
            userId: session?.user?.id,
        }
    }
  });

  // Calculate the sum of tongTien in hoaDon where tinhTrang is 'Đã thanh toán'
  const countRevenue = await prisma.hoaDon.aggregate({
    where: {
      tinhTrang: {
        equals: 'Đã thanh toán'
      },
      suKien: {
        userId: session?.user?.id,
      }
    },
    _sum: {
      tongTien: true
    }
  });


  const data = {
    requestDate: new Date(),
    totalEvent: countItemEvent,
    totalTicket: countItemTicket,
    totalRevenue: countRevenue._sum.tongTien || 0, // Access the sum, or default to 0 if undefined
  };

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
