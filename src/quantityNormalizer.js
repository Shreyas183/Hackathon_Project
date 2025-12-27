export function normalizeQuantity(qty) {
  if (!qty) return null;

  qty = qty.toLowerCase().replace(/\s/g, "");

  if (qty.includes("kg")) return `${parseFloat(qty) * 1000}g`;
  if (qty.includes("gm") || qty.includes("g")) return `${parseFloat(qty)}g`;
  if (qty.includes("ml")) return `${parseFloat(qty)}ml`;
  if (qty.includes("l")) return `${parseFloat(qty) * 1000}ml`;

  return qty;
}
