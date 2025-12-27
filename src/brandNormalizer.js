import { BRAND_ALIASES } from "./config.js";

export function normalizeBrand(brand) {
  if (!brand) return "";
  brand = brand.toLowerCase().trim();
  return BRAND_ALIASES[brand] || brand;
}
