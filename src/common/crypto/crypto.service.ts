import { Injectable } from '@nestjs/common';
import { createDecipheriv, createCipheriv, randomBytes } from 'crypto';
import { KEYS } from 'src/const/keys.const';

@Injectable()
export class CryptoService {
  private algorithm = 'aes-256-cbc';
  private key = Buffer.from(KEYS.encrypt_decrypt_secret, 'base64');
  private iv = this.key.slice(0, 16);

  async decrypt(text: any) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  async encrypt(text: any) {
    let cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }
}
