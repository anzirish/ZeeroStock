import "dotenv/config"; // loads MONGO_URI from .env
import mongoose from "mongoose"
import express from "express"
import { supplierRouter } from "./routes/supplierRoutes.js"
import { inventoryRouter } from "./routes/inventoryRoutes.js"

const app = express()
app.use(express.json()) 

app.use("/supplier", supplierRouter)  
app.use("/inventory", inventoryRouter) 

mongoose
  .connect(process.env.mongo_uri)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((e) => console.log(e));