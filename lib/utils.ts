import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object to regular JS object//
export function convertPrismaToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//Formate number with decimal places
export const formateNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
};
