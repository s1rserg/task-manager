'use server';

import { prisma } from '@/libs/db/db';
import { encryption } from '@/libs/encryption/encryption';
import { userSignUpSchema } from '@/libs/types/auth/schemas';
import { token } from '@/libs/token/token';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppRoute } from '@/libs/common/app/app';

export type SignUpFormState = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  values?: { [key: string]: string };
};

export const signUp = async (
  formState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  const values = Object.fromEntries(formData) as Record<string, string>;

  const parsed = userSignUpSchema.safeParse(values);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    const user = await prisma.user.create({
      data: {
        ...parsed.data,
        password: await encryption.encrypt(parsed.data.password),
      },
    });

    const userToken = await token.createToken({ id: user.id });

    const cookieStore = await cookies();

    cookieStore.set({
      name: 'token',
      value: userToken,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  } catch (err: unknown) {
    if ((err as { code: string }).code === 'P2002') {
      return {
        errors: { _form: ['User with this email already exists.'] },
        values,
      };
    }
    return {
      errors: { _form: ['Something went wrong. Please try again.'] },
      values,
    };
  }

  redirect(AppRoute.DASHBOARD);
};
