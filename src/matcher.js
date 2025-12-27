import stringSimilarity from "string-similarity";
import { HIGH_CONFIDENCE, LOW_CONFIDENCE } from "./config.js";

function quantityCompatible(q1, q2) {
  if (!q1 || !q2) return true;
  return q1 === q2;
}

export function findBestMatch(normalizedMap, incoming) {
  let bestMatch = null;
  let bestScore = 0;

  for (const existing of normalizedMap.values()) {
    if (existing.brand_name !== incoming.brand) continue;
    if (!quantityCompatible(existing.quantity, incoming.quantity)) continue;

    const score = stringSimilarity.compareTwoStrings(
      existing.product_name,
      incoming.product
    );

    if (score >= HIGH_CONFIDENCE) {
      return existing; // strong match
    }

    if (
      score >= LOW_CONFIDENCE &&
      (existing.product_name.includes(incoming.product) ||
       incoming.product.includes(existing.product_name))
    ) {
      if (score > bestScore) {
        bestScore = score;
        bestMatch = existing;
      }
    }
  }
  return bestMatch;
}
