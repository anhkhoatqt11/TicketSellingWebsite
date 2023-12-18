import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const url = new URL(request.url);
    const body = await request.json();
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');


    try {
        const banners = await prisma.banners.create({
            data: {
                ...body,
                suKien: {
                    connect: {
                        id: parseInt(id)
                    }
                }
            }
        });

        return new Response(JSON.stringify(banners), { status: 200 });
    } catch (error) {
        console.error('Error creating banner:', error);
        return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }

}