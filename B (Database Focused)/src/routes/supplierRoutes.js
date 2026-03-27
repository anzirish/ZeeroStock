import express from "express";
import { Supplier } from "../models/Supplier.js";

export const supplierRouter = express.Router();

//  create a new supplier
supplierRouter.post("/", async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json({ supplier });
  } catch (e) {
    res.status(400).json({ error: e.message }); 
  }
});
