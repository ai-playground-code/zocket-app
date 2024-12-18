//Region wise branches schema


import mongoose from "mongoose";
import { DeliveryPartner } from "./user.js";

//Base user schema for reusability


const BranchSchema = new mongoose.Schema({
    name:{ type: String, required:true},
    livelocation: {//using google API using reverse geocoding
        latitude: {type:Number},
        longitude: {type:Number},
    },
    address: { type: String},
    deliveryPartners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"DeliveryPartner",
        }
    ]
});

const Branch = mongoose.model("Branch",BranchSchema);
export default Branch;