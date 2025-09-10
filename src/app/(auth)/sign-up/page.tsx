'use client';

import { signUp } from '@/actions/auth/sign-up';
import { Button } from '@/components/common/button/button';
import { Input } from '@/components/common/input/input';
import { useActionState } from 'react';

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUp, {
    errors: {},
  });

  return (
    <form action={formAction} className='flex flex-col items-center gap-4'>
      {/* <h3 className='text-3xl font-normal mb-4'>Create an account</h3> */}
      <Input label='Name' name='name' errors={state.errors.name} />
      <Input
        label='Email'
        name='email'
        type='email'
        errors={state.errors.email}
      />
      <Input
        label='Password'
        name='password'
        type='password'
        errors={state.errors.password}
      />

      {state.errors._form && (
        <p className='text-red-500 text-sm'>{state.errors._form}</p>
      )}

      <Button label='Sign Up' />
    </form>
  );
}
