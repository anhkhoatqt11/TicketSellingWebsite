import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from "@/lib/prisma";
import jwt from 'jsonwebtoken';


const options: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        console.log(user);

        if (!user) throw new Error('Email or password is incorrect');
        if (user.password !== password)
          throw new Error('Email or password is incorrect');

        if (user.trangThai === 'khoa_tai_khoan') throw new Error('Your account has been locked');

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id,
          avatar: user.avatar,
          isVerified: user.isEmailVerified,
        };
      }
    }),
  ],

  callbacks: {
    async signIn(params) {
      console.log('paramssssssssssssssssssssssssssssssssssssssssssssss: ');
      console.log(params);
      if (!params?.user?.id || parseInt(params?.user?.id) === -1) {
        const payload = jwt.sign(
          { email: params?.user?.email, name: params?.user?.name },
          process.env.NEXT_PUBLIC_JWT_SECRET,
          { expiresIn: '1h' }
        );
        return `/auth/register/?payload=${payload}`;
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      console.log('user in jwt: ');
      console.log(token);
      console.log(user);
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.avatar = user.avatar;
        token.name = user.name;
        token.email = user.email;
        token.isEmailVerified = user.isVerified;
      }
      //user is from the oauth config or in the credentials setting options

      //return final token
      return token;
    },
    async session({ token, session }) {
      // if (!userFind) {
      //   return {
      //     redirectTo: `/auth/login?email=${session?.user.email}&name=${session?.user.name}`,
      //   };
      // }

      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { name: string }).name = token.name as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { avatar: string }).avatar = token.avatar as string;
        (session.user as { email: string }).email = token.email as string;
        (session.user as { isEmailVerified: boolean }).isEmailVerified =
          token.isEmailVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default options;
