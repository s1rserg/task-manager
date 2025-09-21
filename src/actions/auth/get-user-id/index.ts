import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

type AuthTokenPayload = {
  id: string;
};

type GetUserIdResult = {
  success: boolean;
  userId?: string;
  error?: string;
};

export async function getUserId(): Promise<GetUserIdResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {
      success: false,
      error: 'Unauthorized.',
    };
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthTokenPayload;
    return {
      success: true,
      userId: payload.id,
    };
  } catch {
    cookieStore.delete('token');

    return {
      success: false,
      error: 'Invalid token.',
    };
  }
}
