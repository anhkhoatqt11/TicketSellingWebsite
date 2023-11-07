import React from 'react';
import { Otp } from './Otp';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

const page = async ({ searchParams }: { searchParams: any }) => {
  let email = null;

  jwt.verify(
    searchParams.payload,
    process.env.NEXT_PUBLIC_JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        console.log(err);
        return;
      }
      email = decoded?.email;
      const otp = Math.floor(100000 + Math.random() * 900000); // generate 6-digit OTP
      if (email) {
        await prisma.user.update({
          data: {
            otp: otp.toString(),
          },
          where: {
            email: email,
          },
        });
      }

      //   const transporter = await nodemailer.createTransport({
      //     host: 'smtp.gmail.com',
      //     secure: true,
      //     auth: {
      //       user: 'playground.dev001@gmail.com',
      //       pass: 'upnilkyofuyzkhla',
      //     },
      //   });
      //   await transporter.sendMail({
      //     from: '"UIT_Sport" <playground.dev001@gmail.com>',
      //     to: email,
      //     subject: 'Email Verification OTP',
      //     text: `Your OTP for email verification is: ${otp}`,
      //     html: `
      //     <head>
      //     <style>
      //   .title {
      //     font-size: 18px;
      //     font-weight: bold;
      //     text-align: center;
      //     background-color: #000;
      //     color: #fff;
      //     padding: 10px;
      //     border-radius: 5px;
      //     margin-bottom:15px;
      //     }
      //     </style>
      //   </head>
      // <body>
      //   <div class="title">UIT Sport</div>
      //   <div> <b>Your OTP code is: ${otp}</b></div>
      // </body>
      //      `, // HTML body
      //   });
    }
  );
  console.log('email', email);
  if (!email) redirect('/auth/register');
  // send mail with defined transport object

  return (
    <>
      <div className="p-12 relative h-full w-full ">
        <div className="lg:p-8 sm:p-12 ">
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Your OTP code has been sent to your email
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the 6 digits code to verify your account
              </p>
            </div>
            <Otp email={email} />
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
