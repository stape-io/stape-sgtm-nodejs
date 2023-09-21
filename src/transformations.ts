import { Buffer } from 'buffer';
import { createHash } from 'crypto';

export function base64(value: string): string {
  return Buffer.from(value).toString('base64');
}

export function trim(value: string): string {
  return value.trim();
}

export function sha256base64(value: string): string {
  return createHash('sha256')
    .update(value.trim().toLowerCase(), 'utf-8')
    .digest('base64');
}

export function sha256hex(value: string): string {
  return createHash('sha256')
    .update(value.trim().toLowerCase(), 'utf-8')
    .digest('hex');
}

export function md5(value: string): string {
  return createHash('md5')
    .update(value.trim().toLowerCase(), 'utf-8')
    .digest('hex');
}

export function toLowerCase(value: string): string {
  return value.trim().toLowerCase();
}
