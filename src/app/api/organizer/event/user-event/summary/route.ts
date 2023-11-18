import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const eventId = parseInt(searchParams?.get('eventId'))


  // tong so ve da ban
  const ticketNum = await prisma.hoaDonVe.aggregate({
    _sum: {
        soLuong: true
    },
    where: {
        ve: {
            SuKienId: eventId
        }
    }
  })
  // tong thu nhap
  const income = await prisma.hoaDonVe.aggregate({
    _sum: {
        tongGia: true
    },
    where: {
        ve: {
            SuKienId: eventId
        }
    }
  })
  // bieu do tron
  const doughnutChartData = await prisma.hoaDonVe.groupBy({
    by: ['veId'],
    where: {
        ve: {
            SuKienId: eventId
        }
    },
  _sum: {
    soLuong: true,
  },
  })
  // bieu do duong
  const lineChartDate = await prisma.hoaDonVe.findMany({
    where: {
        ve: {
            SuKienId: eventId
        }
    },
    include: {
        ve: true,
        hoaDon: true
    }
  })
  //event information
  const event = await prisma.suKien.findFirst({
    where: {
        id: eventId
    },
    include: {
        ves: true,
        ChuDe: true
    }
  })

  const data = {
    event,ticketNum,income,doughnutChartData,lineChartDate
  }

  return new Response(JSON.stringify(data), { status: 200 });
}