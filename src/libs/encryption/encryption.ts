import bcrypt from 'bcryptjs';

export class Encryption {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async encrypt(data: string): Promise<string> {
    return await bcrypt.hash(data, this.saltRounds);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }
}

export const encryption = new Encryption();
