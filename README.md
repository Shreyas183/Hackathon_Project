# Product Normalization & Combination Engine  
**Hackathon: Product Normalization & Combination Competition**  
**Organizer: Nexora Analytics LLP**

---

## 1. Problem Statement

When product data is scraped from multiple e-commerce platforms, the same real-world product often appears under different names, formats, and descriptions. These variations make it difficult to compare prices and analyze products accurately.

### Example
- Tata Tea Gold Premium 500g  
- Tata Tea Gold Pack 0.5 kg  

Although written differently, both represent the same product.

The goal of this project is to identify such equivalent products and group them under a single **normalized product**, while ensuring genuinely different products remain separate.

---

## 2. Solution Overview

This project implements a **CSV-based product normalization and matching engine** that:

- Normalizes brand names, product names, and quantities  
- Matches identical products across platforms  
- Generates a unified `normalized_products` dataset  
- Assigns a `normalized_product_id` to each raw product  

No frontend or database is used. The focus is entirely on **core logic and accuracy**.

---

## 3. Key Features

- Brand alias normalization  
- Stop-word and packaging-term removal  
- Quantity standardization (kg ↔ g, l ↔ ml)  
- Fingerprint-based exact matching  
- Fuzzy string matching as fallback  
- Low false-positive matching strategy  
- Scalable for large datasets  

---

## 4. Project Structure

```
nexora-product-normalizer/
│
├── data/
│ └── products_backup.csv
│
├── output/
│ ├── products_final.csv
│ └── normalized_products.csv
│
├── src/
│ ├── config.js
│ ├── brandNormalizer.js
│ ├── productNormalizer.js
│ ├── quantityNormalizer.js
│ ├── fingerprint.js
│ ├── matcher.js
│ └── index.js
│
├── package.json
└── README.md

```
---

## 5. Approach & Methodology

### 5.1 Brand Normalization
- Converted to lowercase  
- Trimmed extra spaces  
- Known brand aliases mapped to a canonical form  

**Examples**
- Himalaya Herbals → himalaya  
- HUL → hindustan unilever  
- Milky Mist Dairy → milky mist  

---

### 5.2 Product Name Normalization
- Converted to lowercase  
- Removed punctuation  
- Removed stop words and packaging terms  

**Stop words include**
pack, bottle, jar, box, pouch, combo, set,
with, for, and, the, of

**Example**
- Amul Butter Pack 100g → amul butter  

---

### 5.3 Quantity Normalization

All quantities are converted to base units.

| Original | Normalized |
|--------|------------|
| 1 kg   | 1000g      |
| 500 gm| 500g       |
| 0.5 l | 500ml      |
| 180 ml| 180ml      |

Spaces such as `"1 kg"` are handled correctly.

---

### 5.4 Fingerprint-Based Matching

A fingerprint is generated as:

brand | product_name | quantity


If two products share the same fingerprint, they are treated as an **exact match**.

---

### 5.5 Fuzzy Matching (Fallback)

If no fingerprint match is found:
- Brand must match  
- Quantity must be compatible or missing  
- Fuzzy similarity is applied on product names  

**Thresholds**
- High confidence ≥ 0.92  
- Medium confidence ≥ 0.85 with substring overlap  

This avoids incorrect merges while still handling name variations.

---

## 6. Scalability & Performance

- Uses an in-memory `Map` for normalized products  
- Exact matches are O(1)  
- Fuzzy matching applied only when needed  
- Designed for incremental product additions  

---

## 7. Input

data/products_backup.csv


Raw product data scraped from multiple platforms.

---

## 8. Output

### 8.1 Normalized Products


Raw product data scraped from multiple platforms.

---

## 8. Output

### 8.1 Normalized Products

output/normalized_products.csv


Columns:
- id  
- fingerprint  
- brand_name  
- product_name  
- quantity  
- category  

---

### 8.2 Final Products

output/products_final.csv


Includes all original columns plus:
- normalized_product_id  

---

## 9. How to Run

### Prerequisites
- Node.js (v16+)

## Commands
```bash

npm install
npm start
```


