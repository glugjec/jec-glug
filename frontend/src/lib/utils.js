import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isToday(dateString) {
  if (!dateString) return false;
  const d = new Date(dateString);
  return !isNaN(d.getTime()) && d.toDateString() === new Date().toDateString();
}
