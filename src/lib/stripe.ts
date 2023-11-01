// import { db } from '@/db'
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Stripe from 'stripe';
import { getSession } from './auth';
import prisma from './prisma';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16',
  typescript: true,
});

export async function getUserSubscriptionPlan() {
  const session = await getSession();
  const user = session?.user;

  if (!user.id) {
    return {
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const dbUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return {
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
      dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  );

  let isCanceled = false;
  let plan = {};
  if (isSubscribed && dbUser.stripeSubscriptionId) {
    const userSubscription = await stripe.subscriptions.retrieve(
      dbUser.stripeSubscriptionId
    );

    isCanceled = userSubscription.cancel_at_period_end;
    plan = userSubscription.plan;
  }

  return {
    ...plan,
    stripeSubscriptionId: dbUser.stripeSubscriptionId,
    stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
    stripeCustomerId: dbUser.stripeCustomerId,
    isSubscribed,
    isCanceled,
    userId: dbUser.id,
  };
}
