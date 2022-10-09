import { customAlphabet } from "nanoid";

const guid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 22);

export default guid;
