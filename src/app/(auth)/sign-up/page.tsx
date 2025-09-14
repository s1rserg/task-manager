'use client';

import { signUp } from '@/actions/auth/sign-up';
import { Button } from '@/components/common/button/button';
import { Input } from '@/components/common/input/input';
import { notifyError } from '@/libs/notification/notification';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { useEffect } from 'react';

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUp, {
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
      <h3 className='text-2xl font-medium font-normal'>Create an account</h3>
      <p className='text-sm text-neutral-400'>
        Have an account?{' '}
        <Link
          className='text-violet-500 hover:text-violet-700 transition-all'
          href='/sign-in'
        >
          Log in
        </Link>
      </p>

      <Input
        label='Name'
        name='name'
        errors={state.errors.name}
        defaultValue={state.values?.name}
      />
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

      <Button label='Sign Up' />
    </form>
  );
}
