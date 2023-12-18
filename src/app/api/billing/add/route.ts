import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Destructure HoaDonVe array from the request body
        const { HoaDonVe, ...hoaDonData } = body;

        // Create HoaDon and obtain its id
        const hoaDon = await prisma.hoaDon.create({
            data: {
                ...hoaDonData,
            },
        });

        const hoaDonId = hoaDon.id;

        // If there are HoaDonVe items in the request body, associate them with the created HoaDon
        if (HoaDonVe && HoaDonVe.length > 0) {
            const hoaDonVeItems = HoaDonVe.map((item) => ({
                ...item,
                hoaDonId: hoaDonId,
            }));

            // Create associated HoaDonVe items
            const hoaDonVe = await prisma.hoaDonVe.createMany({
                data: hoaDonVeItems,
            });

            // Subtract soLuong from Ve model
            for (const item of HoaDonVe) {
                const ve = await prisma.ve.findUnique({
                    where: { id: item.veId },
                });

                if (ve) {
                    const updatedSoLuong = ve.soLuong - item.soLuong;

                    // Update soLuong in Ve model
                    await prisma.ve.update({
                        where: { id: item.veId },
                        data: { soLuong: updatedSoLuong },
                    });
                }
            }

            return new Response(JSON.stringify({ hoaDon, hoaDonVe }), { status: 200 });
        }

        // If there are no HoaDonVe items, respond with only the created HoaDon
        return new Response(JSON.stringify(hoaDon), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
