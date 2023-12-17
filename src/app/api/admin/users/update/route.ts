import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const body = await req.json();

        // Assuming the id is present in the request body
        const { id, ...restOfBody } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: id, // or just use shorthand: id,
            },
            data: {
                ...restOfBody, // Spread the rest of the body properties
            },
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
