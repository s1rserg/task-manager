import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

type JWTPayload = {
  id: string;
};

type userIdPayload = {
  success: boolean;
  userId?: string;
  error?: string;
};

export async function getUserId(): Promise<userIdPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {
      success: false,
      error: 'Unauthorized.',
    };
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return {
      success: true,
      userId: payload.id,
    };
  } catch {
    return {
      success: false,
      error: 'Invalid token.',
    };
  }
}
