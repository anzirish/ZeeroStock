import express from "express";
import cors from "cors"

const app = express()
app.use(cors({}))
const PORT = process.env.PORT || 5000;

const products = [
    { id: 1, product_name: "Laptop", category: "Electronics", price: 800 },
    { id: 2, product_name: "Mouse", category: "Electronics", price: 25 },
    { id: 3, product_name: "Keyboard", category: "Electronics", price: 50 },
    { id: 4, product_name: "Monitor", category: "Electronics", price: 200 },
    { id: 5, product_name: "Chair", category: "Furniture", price: 150 },
    { id: 6, product_name: "Table", category: "Furniture", price: 300 },
    { id: 7, product_name: "Lamp", category: "Furniture", price: 40 },
    { id: 8, product_name: "Pen", category: "Stationery", price: 2 },
    { id: 9, product_name: "Notebook", category: "Stationery", price: 5 },
    { id: 10, product_name: "Backpack", category: "Accessories", price: 60 }
];

app.get("/search", (req, res) => {
  try {
    let results = [...products];
    const { q, category, minPrice, maxPrice } = req.query;
    if (q) {
      results = results.filter((item) =>
        item.product_name.toLowerCase().includes(q.toLowerCase()),
      );
    }
    if(category){
        results = results.filter((item) =>
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    if(minPrice){
        results = results.filter((item) => item.price>= parseInt(minPrice))
    }
    if(maxPrice){
        results = results.filter((item) => item.price <= parseInt(maxPrice))
    }

    res.status(200).json({success : true, data : results})
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, ()=>{
    console.log(`Server is running...`)
})