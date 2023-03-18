import { v4 as uuidv4 } from "uuid";
import base from "base-x";


export default function guid(): string {
  const buf = new Uint8Array(16);
  uuidv4(null, buf, 0);

  const base62 = base("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const enc = base62.encode(buf);

  return enc;
}
