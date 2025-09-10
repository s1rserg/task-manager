'use server';

import { prisma } from '@/libs/db/db';
import { encryption } from '@/libs/encryption/encryption';
import { userSchema } from '@/libs/common/auth/schemas';

export type SignUpFormState = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};

export const signUp = async (
  formState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  const parsed = userSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const encryptedUserData = {
    ...parsed.data,
    password: await encryption.encrypt(parsed.data.password),
  };

  try {
    await prisma.user.create({ data: encryptedUserData });
    return {
      errors: {},
    };
  } catch (err: unknown) {
    if ((err as { code: string }).code === 'P2002') {
      return {
        errors: { _form: ['User with this email already exists.'] },
      };
    }
    return {
      errors: { _form: ['Something went wrong. Please try again.'] },
    };
  }
};
