import { useEffect, useState } from "react";
import type { ZodSchema } from "zod";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema: ZodSchema<T>,
) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return initialValue;
    }

    try {
      const parsedValue = JSON.parse(storedValue);
      const result = schema.safeParse(parsedValue);

      if (!result.success) {
        return initialValue;
      }

      return result.data;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
