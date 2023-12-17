import prisma from "@/lib/prisma";

export async function GET() {
  const chudeWithSuKienCount = await prisma.chuDe.findMany({
    include: {
      SuKiens: true,
    }
  });

  if (!chudeWithSuKienCount) {
    return new Response(JSON.stringify({ message: "Không tìm thấy dữ liệu" }), {
      status: 404,
    });
  }

  // Calculate the count for each chuDe
  const chudeWithSuKienCountAndTotal = chudeWithSuKienCount.map(chuDe => {
    const suKienCount = chuDe.SuKiens.length;
    return {
      ...chuDe,
      suKienCount,
    };
  });

  return new Response(JSON.stringify(chudeWithSuKienCountAndTotal), { status: 200 });
}