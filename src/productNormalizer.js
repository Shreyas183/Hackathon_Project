import { STOP_WORDS } from "./config.js";

export function normalizeProductName(name) {
  if (!name) return "";

  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(" ")
    .filter(w => w && !STOP_WORDS.includes(w))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
