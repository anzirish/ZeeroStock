import express from "express";
import { Inventory } from "../models/Inventory.js";
import { Supplier } from "../models/Supplier.js";

export const inventoryRouter = express.Router();

// create a new inventory item
inventoryRouter.post("/", async (req, res) => {
  try {
    // check if supplier_id doesnt exist
    const supplierExists = await Supplier.findById(req.body.supplier_id);
    if (!supplierExists) {
      return res.status(400).json({ error: "Supplier not found" });
    }
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json({ inventory });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// return all inventory grouped by supplier, sorted by total value in (quantity × price) desc
inventoryRouter.get("/", async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      { $group: {
          _id: "$supplier_id",
          totalValue: { $sum: { $multiply: ["$quantity", "$price"] } } 
      }},
      { $sort: { totalValue: -1 } }, 
      { $lookup: {
          from: "suppliers",
          localField: "_id",
          foreignField: "_id",
          as: "supplier" 
      }},
      { $unwind: "$supplier" }, 
      { $project: {
          _id: 0,
          supplier: "$supplier.name",
          city: "$supplier.city",
          totalValue: 1
      }}
    ]);
    res.status(200).json({ data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
