'use client';

import { signIn } from '@/actions/auth/sign-in';
import { Button } from '@/components/common/button/button';
import { Input } from '@/components/common/input/input';
import { AppRoute } from '@/libs/common/app/app';
import { notifyError } from '@/libs/notification/notification';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';

export default function SignUpPage() {
  const [state, formAction] = useActionState(signIn, {
    errors: {},
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;

    if (state.errors._form) {
      notifyError(state.errors._form.join(', '));
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className='w-full max-w-[400px] flex flex-col gap-4'
    >
      <h3 className='text-2xl font-medium font-normal'>Welcome back</h3>
      <p className='text-sm text-neutral-400'>
        Don&apos;t have an account?{' '}
        <Link
          className='text-violet-500 hover:text-violet-700 transition-all'
          href={AppRoute.SIGN_UP}
        >
          Create new
        </Link>
      </p>
      <Input
        label='Email'
        name='email'
        type='email'
        errors={state.errors.email}
        defaultValue={state.values?.email}
      />
      <Input
        label='Password'
        name='password'
        type='password'
        errors={state.errors.password}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        defaultValue={state.values?.password}
      />
      {state.errors._form && (
        <p className='text-red-500 text-sm'>{state.errors._form}</p>
      )}
      <p className='text-sm text-neutral-400 m-0'>
        Forgot password?{' '}
        <Link
          className='text-violet-500 hover:text-violet-700 transition-all'
          href={AppRoute.SIGN_IN}
        >
          Reset
        </Link>
      </p>

      <Button label='Sign Up' />
    </form>
  );
}
