# Zeerostock

## Search Logic

GET /search takes q (partial, case-insensitive match on product name), category, minPrice, maxPrice. All params are optional and can be combined. No params returns everything.

## Performance

For larger datasets, move to a DB and index product_name and category+price so filters don't scan the whole collection.
