import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body) return new Response('no body', { status: 400 });
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user)
      return new Response(
        JSON.stringify({
          message: 'Tài khoản đã tồn tại',
          status: 400,
        })
      );

      console.log(body);

    const create = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
        phoneNumber: '0',
      },
    });
    if (create) {
      const payload = jwt.sign(
        { email: body.email, name: body.name },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn: '5s' }
      );
      return new Response(
        JSON.stringify({
          message: 'Tài khoản đã tạo thành công. Kiểm tra mã OTP được gửi đến Email của bạn',
          payload: payload,
          status: 200,
        })
      );
    }
  } catch (e) {
    console.log(e);
    return new Response('error', { status: 500 });
  }

  return new Response('hello world');
}
