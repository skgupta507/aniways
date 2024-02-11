import { notFound } from 'next/navigation';
import { seed } from '@aniways/data-access/src/database/seed';
import { NextResponse } from 'next/server';

export const POST = async () => {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }
  seed();
  return NextResponse.json({ message: 'Started seeding database' });
};
