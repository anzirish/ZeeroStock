import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier", // references the Supplier collection
    required: true,
  },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 }, 
  price: { type: Number, required: true, min: 0 },    
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
