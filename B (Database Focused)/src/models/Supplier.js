import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name : {type: String, required : true},
    city : {type : String, required : true}
})

export const Supplier = mongoose.model("Supplier", supplierSchema)