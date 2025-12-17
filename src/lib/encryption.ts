import crypto from 'crypto';

// Use a secure key from environment variables or generate a fallback for dev
// In production, this MUST be set in environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-dev-key-must-be-32-bytes!!'; 
const IV_LENGTH = 16; // For AES, this is always 16
const ALGORITHM = 'aes-256-gcm';

export function encrypt(text: string): string {
  // Ensure key is 32 bytes
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // Format: iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string): string {
  try {
    const parts = text.split(':');
    if (parts.length !== 3) {
      // Fallback for legacy base64 or invalid format
      // Try base64 decode just in case we are migrating
      try {
        return Buffer.from(text, 'base64').toString('utf-8');
      } catch {
        throw new Error('Invalid encryption format');
      }
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    // Return empty or throw based on requirement. 
    // Returning empty string to avoid crashing the UI if a key is bad.
    return ''; 
  }
}
