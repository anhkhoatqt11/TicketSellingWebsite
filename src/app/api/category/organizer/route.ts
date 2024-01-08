import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();
  const chudeWithSuKienCount = await prisma.chuDe.findMany({
    include: {
      SuKiens: true,
    },
  });

  if (!chudeWithSuKienCount) {
    return new Response(JSON.stringify({ message: "Không tìm thấy dữ liệu" }), {
      status: 404,
    });
  }

  // Calculate the count for each chuDe
  const chudeWithSuKienCountAndTotal = chudeWithSuKienCount.map(chuDe => {
    const suKienCount = chuDe.SuKiens.filter(i=>i.userId === session?.user?.id).length;
    return {
      ...chuDe,
      suKienCount,
    };
  });

  return new Response(JSON.stringify(chudeWithSuKienCountAndTotal), { status: 200 });
}