import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const body = await req.json();
        const searchParams = new URLSearchParams(url.search);
        const id = searchParams.get('id');


        const updatedsuKien = await prisma.suKien.update({
            where: {
                id: parseInt(id), // or just use shorthand: id,
            },
            data: {
                ...body, // Spread the rest of the body properties
            },
        });

        return new Response(JSON.stringify(updatedsuKien), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
