'use server';

import { prisma } from '@/libs/db/db';
import { redirect } from 'next/navigation';
import { AppRoute } from '@/libs/common/app/app';
import { createTaskSchema } from '@/libs/types/task/schemas';
import { getUserId } from '@/actions/auth/get-user-id';

export type TaskCreateFormState = {
  errors: {
    title?: string[];
    description?: string[];
    dueDate?: string[];
    _form?: string[];
  };
  values?: { [key: string]: string };
};

export const taskCreate = async (
  formState: TaskCreateFormState,
  formData: FormData
): Promise<TaskCreateFormState> => {
  const values = Object.fromEntries(formData) as Record<string, string>;

  const parsed = createTaskSchema.safeParse(values);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    const userIdPayload = await getUserId();

    if (!userIdPayload.success || !userIdPayload.userId) {
      return {
        errors: { _form: [userIdPayload.error || 'User is unathorised.'] },
        values,
      };
    }

    console.log({
      ...parsed.data,
      dueDate: new Date(parsed.data.dueDate).toISOString(),
      authorId: userIdPayload.userId,
    });

    await prisma.task.create({
      data: {
        ...parsed.data,
        dueDate: new Date(parsed.data.dueDate).toISOString(),
        authorId: userIdPayload.userId,
      },
    });
  } catch (err: unknown) {
    console.error(err);
    return {
      errors: { _form: ['Something went wrong. Please try again.'] },
      values,
    };
  }

  redirect(AppRoute.DASHBOARD);
};
