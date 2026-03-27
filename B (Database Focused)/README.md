# Zeerostock

## Schema

Two collections — Supplier (name, city) and Inventory (supplier_id, product_name, quantity, price). supplier_id is an ObjectId ref to Supplier.

## Why MongoDB

Went with MongoDB since there's no complex relational data here and the aggregation pipeline handles the grouping query well.

## Optimization

Index on supplier_id in Inventory would help — it's used on every POST to validate the supplier and in the GET aggregation.
