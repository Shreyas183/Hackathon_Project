import fs from "fs";
import csv from "csv-parser";
import { writeToPath } from "fast-csv";

import { normalizeBrand } from "./brandNormalizer.js";
import { normalizeProductName } from "./productNormalizer.js";
import { normalizeQuantity } from "./quantityNormalizer.js";
import { generateFingerprint } from "./fingerprint.js";
import { findBestMatch } from "./matcher.js";

const INPUT = "data/products_backup.csv";
const PRODUCTS_OUT = "output/products_final.csv";
const NORMALIZED_OUT = "output/normalized_products.csv";

const products = [];
const normalizedMap = new Map();

let normalizedId = 1;
let matches = 0;
let created = 0;

fs.createReadStream(INPUT)
  .pipe(csv())
  .on("data", row => products.push(row))
  .on("end", processProducts);

function processProducts() {
  for (const p of products) {
    const brand = normalizeBrand(p.brand_name);
    const product = normalizeProductName(p.product_name);
    const quantity = normalizeQuantity(p.quantity);

    const fingerprint = generateFingerprint(brand, product, quantity);

    let normalized;

    if (normalizedMap.has(fingerprint)) {
      normalized = normalizedMap.get(fingerprint);
      matches++;
    } else {
      normalized = findBestMatch(normalizedMap, {
        brand,
        product,
        quantity
      });

      if (!normalized) {
        normalized = {
          id: normalizedId++,
          fingerprint,
          brand_name: brand,
          product_name: product,
          quantity,
          category: p.category || null
        };
        normalizedMap.set(fingerprint, normalized);
        created++;
      } else {
        matches++;
      }
    }

    p.normalized_product_id = normalized.id;
  }

  writeResults();
}

function writeResults() {
  console.log("=================================");
  console.log("Total products processed:", products.length);
  console.log("Matches found:", matches);
  console.log("New normalized products:", created);
  console.log("=================================");

  writeToPath(PRODUCTS_OUT, products, { headers: true });
  writeToPath(
    NORMALIZED_OUT,
    Array.from(normalizedMap.values()),
    { headers: true }
  );
}
