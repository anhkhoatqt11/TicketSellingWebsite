import options from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export async function mustBeLoggedIn() {
  const session = await getServerSession(options);
  console.log('session: ', session);
  if (!session) {
    redirect('/auth/login');
  }
}
export async function getSession() {
  const session = await getServerSession(options);
  return session;
}

export async function alreadyLoggedIn() {
  const session = await getServerSession(options);
  console.log('sessionnnnn: ', session);
  if (session) {
    redirect('/');
  }
}
export async function mustBeLoggedInAndVerified() {
  const session = await getServerSession(options);
  console.log('session in loginnnnnn');
  console.log(session);
  if (session && !session?.user?.isEmailVerified) {
    const payload = jwt.sign(
      { email: session.user?.email, name: session.user?.name },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: '1h' }
    );
    redirect(`/auth/register/otp?payload=${payload}`);
  }
}
export async function mustBeAdmin() {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/auth/login');
  }
  if (session?.user?.role !== 'admin') {
    redirect('/');
  }
}
