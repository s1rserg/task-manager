import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { config } from '../config/config';

export class Token {
  private secretKey: Secret;

  constructor(secretKey: Secret) {
    this.secretKey = secretKey;
  }

  createToken(
    payload: object,
    expiresIn: StringValue | number = '24h'
  ): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): {
    valid: boolean;
    payload?: JwtPayload | string;
    error?: string;
  } {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }
}

export const token = new Token(config.JWTSecret);
