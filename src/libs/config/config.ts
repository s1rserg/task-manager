import dotenv from 'dotenv';

dotenv.config();

export class Config {
  public readonly databaseURL: string;
  public readonly JWTSecret: string;

  constructor() {
    this.databaseURL = this.requireEnv(
      process.env.DATABASE_URL,
      'DATABASE_URL'
    );
    this.JWTSecret = this.requireEnv(process.env.JWT_SECRET, 'JWT_SECRET');
  }

  private requireEnv(value: string | undefined, key: string): string {
    if (!value) {
      throw new Error(
        `${key} is required but not defined in environment variables`
      );
    }
    return value;
  }
}

export const config = new Config();
