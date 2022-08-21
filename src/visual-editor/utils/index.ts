import { customAlphabet } from "nanoid";

export const BASE_URL = import.meta.env.BASE_URL;

// 生成nanoid
export const generateNanoid = customAlphabet('UseToGenerateId', 10);
