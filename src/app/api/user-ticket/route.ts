import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("id");
  if (!id) {
    return { status: 400, body: { message: "userId is required" } };
  }
  const events = await prisma.hoaDon.findMany({
    where: {
      userId: parseInt(id),
      tinhTrang: "Đã thanh toán",
    },
    // select: {
    //   ngayDatHang: true,
    //   tinhTrang: true,
    //   HoaDonVe: {
    //     include: {
    //       ve: {
    //         include: {
    //           suKien: true,
    //         },
    //       },
    //     },
    //   },
    // },
    select: {
      id: true,
      ngayDatHang: true,
      tinhTrang: true,
      phuongThucThanhToan: true,
      tongTien: true,
      maDatCho: true,
      suKien: {
        select: {
          id: true,
          name: true,
          diaChi: true,
          ChuDeId: true,
          ChuDe: {
            select: {
              name: true,
            },
          },
          hinhAnhSuKien: true,
          ngayBatDau: true,
          ngayKetThuc: true,
        },
      },
      HoaDonVe: {
        select: {
          soLuong: true,
          tongGia: true,
          ve: {
            select: {
              name: true,
              moTa: true,
              mau: true,
            },
          },
        },
      },
    },
    orderBy: {
      ngayDatHang: "desc",
    },
  });
  return new Response(JSON.stringify(events), {
    status: 200,
  });
}

// {
//     {"ngayDatHang": "2023-11-09T00:00:00.000Z",
//     "tinhTrang": "Chưa thanh toán",
//     "soLuong": 1000,
//     "tongGia": 100000000,}
//     "ngayDatHang": "2023-11-09T00:00:00.000Z",
//     "tinhTrang": "Chưa thanh toán",
//     "name": "Vé Sắt",
//     "moTa": "Vé Sắt với các đặc quyền ưu đãi",
//     "tenSuKien": "The Glory Show - Trải Nghiệm Âm Nhạc Hoàn Toàn Mới tại Dalat Palace Heritage Hotel"}
//     "HoaDonVe": [
//       {
//         "soLuong": 1000,
//         "tongGia": 100000000,
//         "ve": {
//           "name": "Vé Sắt",
//           "moTa": "Vé Sắt với các đặc quyền ưu đãi",
//           "suKien": {
//             "name": "The Glory Show - Trải Nghiệm Âm Nhạc Hoàn Toàn Mới tại Dalat Palace Heritage Hotel"
//           }
//         }
//       },
//       {
//         "soLuong": 200,
//         "tongGia": 20000000,
//         "ve": {
//           "name": "Vé Cao Thủ",
//           "moTa": "Vé Cao Thủ với các đặc quyền V.I.P, sang trọng và phục vụ ở mức cao nhất",
//           "suKien": {
//             "name": "The Glory Show - Trải Nghiệm Âm Nhạc Hoàn Toàn Mới tại Dalat Palace Heritage Hotel"
//           }
//         }
//       }
//     ]
//   }
// ];
