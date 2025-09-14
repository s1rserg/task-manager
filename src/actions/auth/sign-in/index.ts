'use server';

import { prisma } from '@/libs/db/db';
import { encryption } from '@/libs/encryption/encryption';
import { userSignInSchema } from '@/libs/common/auth/schemas';
import { token } from '@/libs/token/token';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type SignInFormState = {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  values?: { [key: string]: string };
  token?: string;
};

export const signIn = async (
  formState: SignInFormState,
  formData: FormData
): Promise<SignInFormState> => {
  const values = Object.fromEntries(formData) as Record<string, string>;

  const parsed = userSignInSchema.safeParse(values);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (
      !user ||
      !(await encryption.compare(parsed.data.password, user.password))
    ) {
      return {
        errors: { _form: ['There is no user with these credentials.'] },
        values,
      };
    }

    const userToken = await token.createToken({ id: user.id });

    const cookieStore = await cookies();

    cookieStore.set({
      name: 'token',
      value: userToken,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    return {
      errors: { _form: ['Something went wrong. Please try again.'] },
      values,
    };
  }

  redirect('/dashboard');
};
