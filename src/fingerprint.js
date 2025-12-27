export function generateFingerprint(brand, product, quantity) {
  return `${brand}|${product}|${quantity || ""}`;
}
