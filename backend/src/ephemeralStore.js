const crypto = require('crypto');

// Ephemeral encrypted in-memory store
// Uses AES-256-GCM. If EPHEMERAL_KEY is provided (hex, 64 chars) it will be used to enable
// decryption across restarts (ONLY for test purposes). Otherwise a random key is generated per process.

const KEY = process.env.EPHEMERAL_KEY ? Buffer.from(process.env.EPHEMERAL_KEY, 'hex') : crypto.randomBytes(32);
const store = new Map();

function encrypt(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const data = Buffer.from(JSON.stringify(value));
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Serialized as base64: iv(12) | tag(16) | encrypted
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

function decrypt(b64) {
  const buf = Buffer.from(b64, 'base64');
  const iv = buf.slice(0, 12);
  const tag = buf.slice(12, 28);
  const encrypted = buf.slice(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return JSON.parse(dec.toString());
}

// TTL cleanup interval (seconds)
const CLEANUP_INTERVAL = 5 * 1000; // 5s
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of store.entries()) {
    if (v.expiresAt && v.expiresAt <= now) store.delete(k);
  }
}, CLEANUP_INTERVAL);

const ephemeralStore = {
  save: (key, value, ttlMs = 60 * 1000) => {
    const encrypted = encrypt(value);
    store.set(key, { encrypted, expiresAt: Date.now() + ttlMs });
  },
  get: (key) => {
    const rec = store.get(key);
    if (!rec) return null;
    if (rec.expiresAt && rec.expiresAt <= Date.now()) {
      store.delete(key);
      return null;
    }
    try {
      return decrypt(rec.encrypted);
    } catch (e) {
      // On decryption error, treat as not present
      return null;
    }
  },
  delete: (key) => store.delete(key),
};

module.exports = { ephemeralStore };