import { z } from "astro/zod";

export function typeToZ<T>() {
  return z.custom<T>(() => true) as z.ZodType<T>;
}
