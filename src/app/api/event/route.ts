import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { addDays } from "date-fns";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  // Retrieves the value of the 'skip' parameter
  const page = parseInt(searchParams?.get("page"));
  const limit = parseInt(searchParams?.get("limit")); // Retrieves the value of the 'limit' parameter
  const searchWord = searchParams.get("searchWord");
  const location = searchParams.get("location");
  const ngayBatDau = searchParams.get("ngayBatDau");
  const ngayKetThuc = searchParams.get("ngayKetThuc");
  const chuDeId = searchParams.get("chuDeId");
  const ngayBatDauDate = ngayBatDau ? new Date(ngayBatDau) : undefined;
  let ngayKetThucDate = ngayKetThuc ? new Date(ngayKetThuc) : undefined;
  if (ngayKetThucDate) {
    // Add one day to the selected date
    ngayKetThucDate = addDays(ngayKetThucDate, 1);
  }
  const events = await prisma.suKien.findMany({
    include: {
      ves: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    where: {
      trangThai: "Đã duyệt",
      name: {
        contains: searchWord || "",
      },
      diaChi: {
        contains: location || "",
      },
      ngayBatDau: {
        gte: ngayBatDauDate,
      },
      ngayKetThuc: {
        lte: ngayKetThucDate,
      },
      ChuDeId: chuDeId ? parseInt(chuDeId) : undefined,
    },
  });
  const countItem = await prisma.suKien.count({
    where: {
      name: {
        contains: searchWord || "",
      },
      diaChi: {
        contains: location || "",
      },
      ngayBatDau: {
        gte: ngayBatDauDate,
      },
      ngayKetThuc: {
        lte: ngayKetThucDate,
      },
      ChuDeId: chuDeId ? parseInt(chuDeId) : undefined,
    },
  });
  const data = {
    data: events,
    totalPages: Math.ceil(countItem / limit),
    totalItems: events.length,
  };
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
